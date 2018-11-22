import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { PoiService } from '../poi.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocaleService } from '../locale.service';
import translate from '../translations/translate';
import {PoiEditFormsService} from './poi-edit-forms.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Sight, Legend, Restaurant } from './poi.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UploadStatusDialogComponent } from './upload-status-dialog/upload-status-dialog.component';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import {isEqual} from 'lodash';


@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css'],
  providers: [PoiEditFormsService]
})
export class PoiEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  t;

  poiTypes = ['restaurants', 'legends', 'sights'];
  defaultType = 'legends';

  // original object from backend, has additional props like mongoose-id
  poi = null;
  // initial value received from the actual form, used for dirty-check
  initPoi = null;

  type: string  = null;
  id = null;

  editMode = false;

  // needed to inform child about reset
  reset = new Subject<boolean>();

  reqPending = false;
  responseSuccess = false;

  poiForm: FormGroup;
  contentForm: FormGroup;
  videoForm: FormGroup;
  imgForm: FormGroup;
  vuforiaArray: FormArray;
  iconForm: FormGroup;

  paramSub: Subscription;
  reqSub: Subscription;

  dialogOpened = false;

  constructor(
    private route: ActivatedRoute,
    private poiService: PoiService,
    public localeService: LocaleService,
    public formsService: PoiEditFormsService,
    private dialog: MatDialog
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

    this.poiForm.valueChanges.subscribe((val) => {
     // console.log('poi sub', this.poiForm);
    })

  }


  ngOnInit() {

    this.setT(this.localeService.getLocale())
    this.localeService.localeUpdated.subscribe(this.setT.bind(this))

    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.queryParamMap.get('type');

    this.paramSub = this.route.paramMap.subscribe(params => {
      if (params.has('id') && params.has('type')) {
        this.editMode = true;
        this.id = params.get('id');
        this.type = params.get('type');
        this.setupForms();
      }
    });

    if (this.id && this.type) {
      this.editMode = true;
    }

    this.setupForms();

  }

  openDialog(req): void {
    this.reqPending = true;
    const dialogRef = this.dialog.open(UploadStatusDialogComponent, {
      width: '50%',
      data: {req}
    });

    dialogRef.afterOpened().pipe(take(1)).subscribe(() => {
      this.dialogOpened = true;
    })

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      this.reqPending = false;
    });
  }

  isLegend(): boolean {
    return this.poiForm.controls.type.value === 'legends';
  }

  onSubmit() {
    console.log(this.poiForm);
    const poi = this.poiForm.value;
    this.reqPending = true;

    // cancel existing request
    if ( this.reqSub ) {
      this.reqSub.unsubscribe();
   }

    const req =  this.editMode ? this.poiService.putPOI(poi) : this.poiService.postPOI(poi);
    this.openDialog(req);
  }

  /**
   * revert to initial poi
   */
  resetForms() {
    // inform child about reset
    this.reset.next(true);

    this.formsService.reset();
    if (this.poi) {
      this.formsService.update(this.poi);
    } else {
      this.poiForm.setValue(this.initPoi);
    }

  }

  get langs() {
    return Object.keys((this.poiForm.get('name') as FormGroup).controls) as Array<string>;
  }

  initContentForm(contentForm: FormGroup) {
    (this.formsService.poiForm.get('media') as FormGroup).removeControl('content');
    (this.formsService.poiForm.get('media')as FormGroup).addControl('content', contentForm);

    if (this.editMode) {
      this.editMode = true;
      this.poiService
        .getPOI(this.id)
        .pipe(take(1))
        .subscribe((poi: Sight | Legend | Restaurant) => {
          this.poi = poi;
          this.formsService.update(poi);
          this.initPoi = this.poiForm.value;
        });
    } else {
      // save object with no values for dirty-check
      this.initPoi = this.poiForm.value;
    }
  }

  updateCoords(coords) {
    this.poiForm.controls.coordinates.setValue(coords);
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();

    if (this.reqSub) {
      this.reqSub.unsubscribe();
    }

  }

  canDeactivate(): Observable<boolean> | boolean {
    // check if initial poi-object and poiForm-value are the same
    const formValue = this.poiForm.value;
    if (isEqual(formValue, this.initPoi) || this.dialogOpened) {
      return true;
    }

    // form is dirty
    return window.confirm('There are unsaved changes! You really want to leave?');
  }

}
