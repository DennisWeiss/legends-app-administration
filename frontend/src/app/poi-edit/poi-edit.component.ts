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

  editMode = false;
  poi = null;
  type: string  = null;
  id = null;
  defaultType = 'legends';

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

    const initialType = this.editMode ? this.type : this.defaultType;
    this.poiForm.controls.type.setValue(initialType);
    this.poiEditFormsService.initContentForm(initialType);

    this.contentForm = this.poiEditFormsService.contentForm;
    this.videoForm = this.poiEditFormsService.videoForm;
    this.iconForm = this.poiEditFormsService.iconForm;
    this.vuforiaArray = this.poiEditFormsService.vuforiaArray;
    this.imgForm = this.poiEditFormsService.imgForm;

     // subscribe to future changes of type
     this.poiForm.controls.type.valueChanges
     .subscribe((val) => this.poiEditFormsService.initContentForm(val));
  }


  ngOnInit() {


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

    this.setupForms();
    console.log('in edit', this.contentForm);

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
