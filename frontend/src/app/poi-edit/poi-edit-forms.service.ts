import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ContentFormService } from './poi-content/content-form.service';
import { rootRenderNodes } from '@angular/core/src/view';

@Injectable()
export class PoiEditFormsService {

  constructor(private fb: FormBuilder) {}

  langs = ['de', 'en', 'pl'];


  contentForm = this.fb.group({
  });

  videoForm = this.fb.group({
    arScene: ['', Validators.required],
    iconScene: ['', Validators.required]
  });

  iconForm = this.fb.group({
    default: ['', Validators.required],
    explored: ['', Validators.required]
  });

  imgForm = this.fb.group({
    preview: ['', Validators.required]
  });

  vuforiaArray = new FormArray([]);

  poiForm = this.fb.group({
    key: ['', Validators.required],
    name: this.fb.group({
      en: ['', Validators.required],
      de: ['', Validators.required],
      pl: ['', Validators.required]
    }),
    beaconId: [-1, Validators.required],
    type: ['', Validators.required], // select deactivated when editing
    coordinates: this.fb.group({
      lat: ['', Validators.required],
      lng: ['', Validators.required]
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
    poi.media.vuforiaTargets.forEach((url) => {
      this.vuforiaArray.push(new FormControl(url));
    })
    this.poiForm.patchValue(poi);

  }

  reset() {
    this.clearFormArray(this.vuforiaArray);
    const type = this.poiForm.controls.type.value;
    this.poiForm.reset();
    this.poiForm.controls.type.setValue(type);
  }

  private clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

}
