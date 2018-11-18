import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoiService } from '../poi.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocaleService } from '../locale.service';
import translate from '../translations/translate';
import {PoiEditFormsService} from './poi-edit-forms.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Sight, Legend, Restaurant } from './poi.model';
import { ContentFormService } from './poi-content/content-form.service';

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css']
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
  vuforiaArray: FormArray;
  iconForm: FormGroup;

  paramSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private poiService: PoiService,
    public localeService: LocaleService,
    public formsService: PoiEditFormsService,
    private contentFormService: ContentFormService
  ) {
  }


  setT(locale: string) {
    this.t = translate('poi-edit', locale)
  }

  setupForms(): void {

    this.poiForm = this.formsService.poiForm;

    const initialType = this.editMode ? this.type : this.defaultType;
    this.poiForm.controls.type.setValue(initialType);

    this.contentForm = this.formsService.contentForm;
    this.videoForm = this.formsService.videoForm;
    this.iconForm = this.formsService.iconForm;
    this.vuforiaArray = this.formsService.vuforiaArray;
    this.imgForm = this.formsService.imgForm;

     // subscribe to future changes of type
     this.poiForm.controls.type.valueChanges
     .subscribe((val) => {
       if (!this.editMode) {
         this.contentFormService.initContentForm(val);
       }
    });

    this.poiForm.valueChanges.subscribe((val) => {
      console.log('poi sub', this.poiForm);
    })

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
          this.formsService.update(poi);
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

    const poi = this.poiForm.value;
    const request =  this.editMode ? this.poiService.putPOI(poi) : this.poiService.postPOI(poi);
    request.pipe(take(1)).subscribe((res) => {
      console.log('res', res);
    });
  }

  /**
   * revert to initial poi
   */
  resetForms() {
    if (this.poi) {
      this.formsService.update(this.poi);
    } else {
      this.formsService.reset();
    }
  }

  get langs() {
    return Object.keys((this.poiForm.get('name') as FormGroup).controls) as Array<string>;
  }

  initContentForm(contentForm: FormGroup) {
    (this.formsService.poiForm.get('media') as FormGroup).removeControl('content');
    (this.formsService.poiForm.get('media')as FormGroup).addControl('content', contentForm);
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();

  }
}
