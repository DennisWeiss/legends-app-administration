import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Injectable()
export class PoiEditFormsService {

  constructor(private fb: FormBuilder) {}

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

  vuforiaArray = new FormArray([]);

  poiForm = this.fb.group({
    key: [''],
    name: this.fb.group({
      en: [''],
      de: [''],
      pl: ['']
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
    this.clearFormGroup(this.contentForm);
    this.createContentForm(poi);
    // use patchValue to avoid conflicts, e.g. caused by mongoose-id from backend
    poi.media.vuforiaTargets.forEach((url) => {
      this.vuforiaArray.push(new FormControl(url));
    })
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

  initContentForm(type): void {

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

  private clearFormGroup(fg) {
    Object.keys(fg.controls).forEach((name) => fg.removeControl(name));
  }

private createRestaurantForm(): FormGroup {
    return this.fb.group({
      info: this.fb.group({
        heading: [''],
        index: [0],
        type: ['info'],
        url: ['']
      })
    });
  }

  private createSightForm(): FormGroup {
    return this.createRestaurantForm();
  }

  private createLegendForm(content): FormGroup {

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
