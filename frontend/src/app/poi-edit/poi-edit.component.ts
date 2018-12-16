import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { PoiService } from '../poi.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {PoiEditFormsService} from './poi-edit-forms.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Sight, Legend, Restaurant } from './poi.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UploadStatusDialogComponent } from './upload-status-dialog/upload-status-dialog.component';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import {isEqual} from 'lodash';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css'],
  providers: [PoiEditFormsService]
})
export class PoiEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  name = 'poi-edit';

  poiTypes = ['restaurants', 'legends', 'sights'];
  defaultType = 'legends';

  // original object from backend, has additional props like mongoose-id
  poi = null;
  // initial value received from the actual form, used for dirty-check
  initPoi = null;

  type: string  = null;
  id: string = null;

  editMode = false;

  // needed to inform child about status change
  statusChanged = new Subject<string>();

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
    public formsService: PoiEditFormsService,
    private dialog: MatDialog
  ) {
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
      width: '300px',
      data: {req}
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      this.reqPending = false;
      this.dialogOpened = false;
    });
  }

  isLegend(): boolean {
    return this.poiForm.controls.type.value === 'legends';
  }

  onSubmit() {
    console.log(this.poiForm);
    this.statusChanged.next('submit');
    const poi = this.poiForm.value;
    this.reqPending = true;

    // cancel existing request
    if ( this.reqSub ) {
      this.reqSub.unsubscribe();
   }

    // needed so that route can deactivate without warning-popup
    this.dialogOpened = true;

    const req =  this.editMode ? this.poiService.putPOI(poi) : this.poiService.postPOI(poi);
    this.openDialog(req);
  }

  /**
   * revert to initial poi
   */
  resetForms() {
    // inform child about reset
    this.statusChanged.next('reset');

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

  onContentFormReceived(contentForm: FormGroup) {
    (this.formsService.poiForm.get('media') as FormGroup).removeControl('content');
    (this.formsService.poiForm.get('media')as FormGroup).addControl('content', contentForm);

    if (this.editMode) {
      this.editMode = true;
      this.poiService
        .getPOI(this.id)
        .pipe(take(1))
        .subscribe((poi: Sight | Legend | Restaurant) => {
          this.poi = poi;
          this.formsService.update(this.poi);
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

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // check if initial poi-object and poiForm-value are the same
    const formValue = this.poiForm.value;
    if (isEqual(formValue, this.initPoi) || this.dialogOpened) {
      return true;
    }

    // form is dirty
    return window.confirm('There are unsaved changes! Do you really want to leave?');
  }

}
