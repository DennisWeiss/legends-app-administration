import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoiService } from '../poi.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocaleService } from '../locale.service';
import translate from '../translations/translate';
import {PoiEditFormsService} from './poi-edit-forms.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Sight, Legend, Restaurant } from './poi.model';

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css'],
  providers: [PoiEditFormsService]
})
export class PoiEditComponent implements OnInit, OnDestroy {
  t;
  poiTypes = ['restaurants', 'legends', 'sights'];
  langs = ['DE', 'EN', 'PL'];

  editMode = false;
  poi = null;
  type: string  = null;
  id = null;

  poiForm: FormGroup;
  contentForm: FormGroup;
  videoForm: FormGroup;
  imgForm: FormGroup;
  vuforiaArray: FormControl;
  iconForm: FormGroup;

  paramSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private poiService: PoiService,
    public localeService: LocaleService,
    private poiEditFormsService: PoiEditFormsService
  ) {
  }


  setT(locale: string) {
    this.t = translate('poi-edit', locale)
  }

  setupForms(): void {
    this.poiForm = this.poiEditFormsService.poiForm;
    this.contentForm = this.poiEditFormsService.contentForm;
    this.videoForm = this.poiEditFormsService.videoForm;
    this.iconForm = this.poiEditFormsService.iconForm;
    this.vuforiaArray = this.poiEditFormsService.vuforiaArray;
    this.imgForm = this.poiEditFormsService.imgForm;
  }


  ngOnInit() {

    this.setupForms();

    this.setT(this.localeService.getLocale())
    this.localeService.localeUpdated.subscribe(this.setT.bind(this))

    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.queryParamMap.get('type');

    if (this.id && this.type) {
      this.editMode = true;
      this.poiService
        .getPOI(this.id)
        .pipe(take(1))
        .subscribe((poi: Sight | Legend | Restaurant) => {
          this.poi = poi;
          console.log(this.poi.kind);
          this.poiEditFormsService.update(poi);
        });
    }

    this.paramSub = this.route.paramMap.subscribe(params => {
      if (params.has('id') && params.has('type')) {
        this.editMode = true;
        this.id = params.get('id');
        this.type = params.get('type');
      }
    });

  }

  isLegend(): boolean {
    return this.poiForm.controls.type.value === 'legends';
  }

  onSubmit() {
    console.log(this.poiForm);
  }

  /**
   * revert to initial poi
   */
  resetForms() {
    if (this.poi) {
      this.poiEditFormsService.update(this.poi);
    } else {
      this.poiEditFormsService.reset();
    }
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();

  }
}
