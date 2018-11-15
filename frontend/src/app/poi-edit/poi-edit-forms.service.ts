import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { PoiEditComponent } from './poi-edit.component';
import {PoiService} from "../poi.service";

@Injectable()
export class PoiEditFormsService {

  poiService: PoiService

  contentForm = this.fb.group({
  })

  videoForm = this.fb.group({
    arScene: [''],
    iconScene: ['']
  });

  iconForm = this.fb.group({
    default: null,
    explored: null
  });

  imgForm = this.fb.group({
    preview: null
  });

  vuforiaArray = new FormControl([]);

  poiForm = this.fb.group({
    name: ['', Validators.required],
    beaconId: ['', Validators.required],
    type: ['LEGEND', Validators.required],
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


  constructor(private fb: FormBuilder) {
  }


  update(poi) {
    this.poiForm.patchValue(poi);
  }

  reset() {
    const type = this.poiForm.controls.type.value;
    this.poiForm.reset();
    this.poiForm.controls.type.setValue(type);
  }


  /**
   * dynamically create content-form based on the available languages
   */
  private createContentForm() {

  }

}
