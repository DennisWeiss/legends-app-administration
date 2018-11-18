import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContentFormService {

  constructor(private fb: FormBuilder) { }

  langs = ['de', 'en', 'pl'];

  type;

  poiCallbacks = {
    'restaurants': this.createRestaurantForm.bind(this),
    'sights':  this.createSightForm.bind(this),
    'legends': this.createLegendForm.bind(this)
  };

  contentForm = this.fb.group({
  });



  update(contents, type) {
    this.clearFormGroup(this.contentForm);
    this.createContentForm(contents, type);
    // use patchValue to avoid conflicts, e.g. caused by mongoose-id from backend
    //this.contentForm.patchValue(contents);

  }

  reset(content, type) {
    this.contentForm.reset();
    // this.poiForm.controls.type.setValue(type);
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
private createContentForm(contents, type): void {

  // get right factory
  const formFactory = this.poiCallbacks[type];

  Object.entries(contents).forEach(([lang, content]) => {
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
  const currType = (this.contentForm.root as FormGroup).controls.type.value;
  this.contentForm.addControl(lang, this.poiCallbacks[currType]);
}

removeLang(lang) {
  this.contentForm.removeControl(lang);
}


}
