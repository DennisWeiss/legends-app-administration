import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoiService } from '../shared/services/poi.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
import {PoiEditFormsService} from './poi-edit-forms.service';
import { FormGroup,FormArray } from '@angular/forms';
import { POI } from './poi.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UploadStatusDialogComponent } from './upload-status-dialog/upload-status-dialog.component';
import { CanComponentDeactivate } from '../shared/guards/can-deactivate.guard';
import {isEqual} from 'lodash';
import { HostListener } from '@angular/core';
import * as moment from 'moment';
import {getTimestamp} from "../utils/helperfunctions";
import { Beacon } from '../shared/models/beacon.model';
import { BeaconService } from '../shared/services/beacon.service';


const mapPOIData = poi => {
  const {publishingTimestamp, ...poiData} = poi
  const dateTime = moment.unix(publishingTimestamp)
  return {
    publishImmediately: false,
    publishingDate: dateTime.toDate(),
    publishingTime: dateTime.format('hh:mm a'),
    ...poiData
  };
}

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css'],
  providers: [PoiEditFormsService]
})
export class PoiEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  // name used for i18n
  name = 'poi-edit';

  invalidErrMsg = 'Field required!';

  // TODO: Get all types from server -> reduce redundancy
  poiTypes = ['restaurants', 'legends', 'sights'];
  defaultType = 'legends';

  // original object from backend, has additional props like mongoose-id
  poi = null;
  // initial value received from the actual form, used for dirty-check
  initPoi = null;

  type: string  = null;
  id: string = null;

  // component can be in a 'clean' state or editing state
  editMode = false;

  // needed to inform child about status change
  statusChanged = new Subject<string>();

  newPoiFetched = new Subject<POI>();

  dialogOpened = false;

  // references for quick access
  poiForm: FormGroup;
  contentForm: FormGroup;
  videoForm: FormGroup;
  imgForm: FormGroup;
  vuforiaArray: FormArray;
  iconForm: FormGroup;

  // subscriptions
  paramSub: Subscription;
  reqSub: Subscription;


  constructor(
    private route: ActivatedRoute,
    private poiService: PoiService,
    public formsService: PoiEditFormsService,
    private dialog: MatDialog,
    private beaconService: BeaconService
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


    this.poiForm.controls.type.valueChanges.subscribe((val) => {
        this.poiForm.controls.beaconId.reset();
        this.poiForm.controls.beaconId.setValue(-1);
    })

  }

  ngOnInit() {



    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.queryParamMap.get('type');


    // TODO: fetch poi with given id
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

  openUploadDialog(req): void {
    const dialogRef = this.dialog.open(UploadStatusDialogComponent, {
      width: '300px',
      data: {req}
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      this.dialogOpened = false;
    });
  }

  isLegend(): boolean {
    return this.poiForm.controls.type.value === 'legends';
  }


/**
 * Marks all children of a formGroup as touched
 *
 * @param formGroup formGroup to be marked
 */

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onSubmit() {

    if (this.poiForm.invalid) {
      this.markFormGroupTouched(this.poiForm);
      return;
    }

    console.log(this.poiForm);


    // inform child about submit
    this.statusChanged.next('submit');

    const poi = this.poiForm.value;

    // cancel existing request
    if ( this.reqSub ) {
      this.reqSub.unsubscribe();
   }

    // needed so that route can deactivate without warning-popup
    this.dialogOpened = true;

    const req =  this.editMode ? this.poiService.putPOI(poi) : this.poiService.postPOI(poi);
    this.openUploadDialog(req);
  }

  /**
   * revert to initial poi
   */
  resetForms() {
    // inform child about reset
    this.statusChanged.next('reset');

    this.formsService.reset();
    if (this.poi) { // take intially fetched poi and update form with it
      this.formsService.update(this.poi);
    } else { // create an empty form
      this.poiForm.setValue(this.initPoi);
    }

  }

  get langs() {
    return Object.keys((this.poiForm.get('name') as FormGroup).controls) as Array<string>;
  }


/**
 * Is called whenever contentForm was initialized
 *
 * POI is not fetched in ngOnInit because contentForm is dynamically created and needs to be ready
 * before getting and assigning the fetched poi as a value.
 *
 * @param contentForm child-form containing all content of a POI
 */

  onContentFormReceived(contentForm: FormGroup): void {
    (this.formsService.poiForm.get('media') as FormGroup).removeControl('content');
    (this.formsService.poiForm.get('media')as FormGroup).addControl('content', contentForm);

    if (this.editMode) {
      this.editMode = true;
      this.poiService
        .getPOI(this.id)
        .pipe(take(1))
        .subscribe((poi: POI) => {
          this.poi = poi;
          this.newPoiFetched.next(poi);
          this.formsService.update(mapPOIData(this.poi));
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

  hasBeenPublished() {
    return this.editMode && moment().isAfter(moment.unix(getTimestamp(this.poiForm.controls.publishingDate.value,
      this.poiForm.controls.publishingTime.value)))
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
