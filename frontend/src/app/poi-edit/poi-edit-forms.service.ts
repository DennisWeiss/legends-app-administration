import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import {PoiService} from '../poi.service';

@Injectable()
export class PoiEditFormsService {

  constructor(private fb: FormBuilder) {}

  poiService: PoiService;

  langs = ['de', 'en', 'pl'];

  poiCallbacks = {
    'restaurants': this.createRestaurantForm.bind(this),
    'sights':  this.createSightForm.bind(this),
    'legends': this.createLegendForm.bind(this)
  };

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

  vuforiaArray = new FormControl([]);

  poiForm = this.fb.group({
    name: ['', Validators.required],
    beaconId: ['', Validators.required],
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
    this.createContentForm(poi);
    (this.poiForm.get('media') as FormGroup).controls.content = this.contentForm;
    // use patchValue to avoid conflicts, e.g. caused by mongoose-id from backend
    this.poiForm.patchValue(poi);
  }

  reset() {
    const type = this.poiForm.controls.type.value;
    this.poiForm.reset();
    this.poiForm.controls.type.setValue(type);
  }

/**
 * Is called by PoiEditComponent at the start so that contentForm is initialized
 *
 */

  initContentForm(type) {

    if (!type) { return; }

    const formFactory = this.poiCallbacks[type];

    this.langs.forEach((lang) => {
      this.contentForm.removeControl(lang);
      this.contentForm.addControl(lang, formFactory({puzzle: {hints: [1, 2]}}));
    })
  }

  /**
   * dynamically create content-form based on the available languages
   */
  private createContentForm(poi): void {

    // get right factory
    const formFactory = this.poiCallbacks[poi.type];

    Object.entries(poi.media.content).forEach(([lang, content]) => {
      this.contentForm.removeControl(lang);
      this.contentForm.addControl(lang, formFactory(content));
    });
  }

  createRestaurantForm(): FormGroup {
    return this.fb.group({
      info: this.fb.group({
        heading: [''],
        index: [0],
        type: [''],
        url: ['']
      })
    });
  }

  createSightForm(): FormGroup {
    return this.createRestaurantForm();
  }

  createLegendForm(content): FormGroup {

    const hintsForm = this.fb.array([]);

    content.puzzle.hints.forEach((hint, index) => {
      hintsForm.push(this.fb.group({
        index: [index],
        url: ['']
      }));
    })

    return this.fb.group({
      explored: this.fb.group({
        heading: [''],
        index: [1],
        type: ['info_explored'],
        url: ['']
      }),
      preview: this.fb.group({
        heading: [''],
        index: [0],
        type: ['info'],
        url: ['']
      }),
      puzzle: this.fb.group({
        heading: [''],
        hints: hintsForm,
        index: [2],
        type: ['puzzle'],
        url: ['']
      })
    })
  }

  addLang(lang) {
    const currType = this.poiForm.controls.type.value;
    this.contentForm.addControl(lang, this.poiCallbacks[currType]);
  }

  removeLang(lang) {
    this.contentForm.removeControl(lang);
  }
}
