import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Injectable()
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
    this.contentForm.patchValue(contents);
    this.contentForm.markAsPristine();
  }

  reset() {
    this.contentForm.reset();
    this.clearFormGroup(this.contentForm);
    this.contentForm.markAsPristine();
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
  this.contentForm.markAsPristine();
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

addLang(lang, type) {
  const formFactory = this.poiCallbacks[type];
  this.contentForm.addControl(lang, formFactory({puzzle: {hints: [1, 2]}}));
}

removeLang(lang) {
  this.contentForm.removeControl(lang);
}

addHint(hints: FormArray) {
  const index = hints.length;

  hints.push(this.fb.group({
    index: [index],
    url: ['']
  }));
}

removeHint(hints, index) {
  hints.removeAt(index);
}


}
