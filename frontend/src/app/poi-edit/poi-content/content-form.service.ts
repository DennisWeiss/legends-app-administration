import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContentFormService {

  constructor(private fb: FormBuilder) { }

  langs = environment.defaultLangs;

  type: string;

  initialContentObj = {puzzle: {hints: [1, 2]}};

/**
 * add new factories here!
 */

  poiCallbacks = {
    'restaurants': this.createRestaurantForm.bind(this),
    'sights':  this.createSightForm.bind(this),
    'legends': this.createLegendForm.bind(this)
  };

  contentForm = this.fb.group({});

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
    this.contentForm.addControl(lang, formFactory(this.initialContentObj));
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
    name: ['', Validators.required],
    info: this.fb.group({
      heading: ['', Validators.required],
      index: [0, Validators.required],
      type: ['info', Validators.required],
      url: ['', Validators.required]
    })
  });
}

private createSightForm(): FormGroup {
  // has exactly the same structure
  return this.createRestaurantForm();
}

private createLegendForm(content): FormGroup {

  const hintsForm = this.fb.array([]);

  content.puzzle.hints.forEach((hint, index) => {
    hintsForm.push(this.fb.group({
      index: [index, Validators.required],
      url: [hint.url, Validators.required]
    }));
  })

  return this.fb.group({
    name: ['', Validators.required],
    explored: this.fb.group({
      heading: ['', Validators.required],
      index: [1, Validators.required],
      type: ['info_explored', Validators.required],
      url: ['', Validators.required]
    }),
    preview: this.fb.group({
      heading: ['', Validators.required],
      index: [0, Validators.required],
      type: ['info', Validators.required],
      url: ['', Validators.required]
    }),
    puzzle: this.fb.group({
      heading: ['', Validators.required],
      hints: hintsForm,
      index: [2, Validators.required],
      type: ['puzzle', Validators.required],
      url: ['', Validators.required]
    })
  })
}

addLang(lang, type) {
  const formFactory = this.poiCallbacks[type];
  this.contentForm.addControl(lang, formFactory(this.initialContentObj));
}

removeLang(lang) {
  if(this.langs.includes(lang)) {
    return;
  }
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
