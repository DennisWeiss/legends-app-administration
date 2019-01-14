import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import * as moment from "moment";
import { BeaconService } from '../shared/services/beacon.service';
import { of, Observable, timer } from 'rxjs';
import { switchMap , mapTo, catchError} from 'rxjs/operators';

@Injectable()
export class PoiEditFormsService {

  constructor(private fb: FormBuilder,
              private beaconService: BeaconService) {}


  langs = ['de', 'en', 'pl'];

  contentForm = this.fb.group({
  });

  videoForm = this.fb.group({
    arScene: [''],
    iconScene: ['']
  });

  iconForm = this.fb.group({
    default: [''],
    explored: ['']
  });

  imgForm = this.fb.group({
    preview: ['']
  });

  vuforiaArray = new FormArray([]);

  poiForm = this.fb.group({
    key: [''],
    publishImmediately: [true, Validators.required],
    publishingDate: [moment().add(1, 'day').toDate(), Validators.required],
    publishingTime: ['12:00 am', Validators.required],
    beaconId: [-1, Validators.required, this.validateBeacon.bind(this)],
    type: ['', Validators.required], // select deactivated when editing
    coordinates: this.fb.group({
      lat: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
      lng: [null, [Validators.required, Validators.min(-180), Validators.max(180)]]
    }),
    icons: this.iconForm,
    media: this.fb.group({
      content: this.contentForm,
      image: this.imgForm,
      video: this.videoForm,
      vuforiaTargets: this.vuforiaArray
    })
  });

  update(poi) {
    // use patchValue to avoid conflicts, e.g. caused by mongoose-id from backend
    const formArray = new FormArray([]);
    poi.media.vuforiaTargets.forEach((url) => {
      formArray.push(new FormControl(url));
    })
    this.vuforiaArray.controls = formArray.controls;
    this.poiForm.patchValue(poi);
    this.poiForm.markAsPristine();

  }

  reset() {
    
    this.clearFormArray(this.vuforiaArray);
    const type = this.poiForm.controls.type.value;
    this.poiForm.reset();
    this.poiForm.controls.type.setValue(type);
    this.poiForm.markAsPristine();
  }

  private clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }


  validateBeacon(beaconControl: AbstractControl): Observable<any> {

    // user did not interact with control yet -> no need for validation
    if(beaconControl.pristine) {
      return of(null);
    }

    return timer(500).pipe(switchMap(()=>{
      return this.beaconService.getBeacon(beaconControl.value)
    })
    ,mapTo(null)
    ,catchError(err=> of({beaconNotFound: true}))
    );

  }
}
