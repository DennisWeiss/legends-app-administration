import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocaleService } from '../../locale.service';
import translate from 'src/app/translations/translate';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ContentFormService } from './content-form.service';
import { ActivatedRoute } from '@angular/router';
import { PoiService } from 'src/app/poi.service';
import { take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Restaurant, Sight, Legend } from '../poi.model';

@Component({
  selector: 'app-poi-content',
  templateUrl: './poi-content.component.html',
  styleUrls: ['./poi-content.component.css'],
  providers: [ContentFormService]
})
export class PoiContentComponent implements OnInit {

  private _poi;

  t;
  @Input() type: string;
  @Input() poiForm: FormGroup;
  @Input() editMode: boolean;
  @Input() parentReset: Observable<any>;
  @Input() set poi(val: Legend | Restaurant | Sight) {

    // we need to listen to changes in order to dynamically create
    // contentForm before assigning data to poiForm
    if (val) {
      this._poi = val;
      this.contentFormService.update(this._poi.media.content, this._poi.type);
    }
  }

  get poi() {
    return this._poi;
  }

  get hasParent() {
    return this.poiForm;
  }

  @Output() contentFormCreated: EventEmitter<FormGroup> = new EventEmitter();

  contents;
  contentForm: FormGroup;

  id: string;

  paramSub: Subscription;


  constructor(
    public localeService: LocaleService,
    private fb: FormBuilder,
    private contentFormService: ContentFormService,
    private route: ActivatedRoute,
    private poiService: PoiService
    ) { }

  setT(locale: string) {
    this.t = translate('poi-content', locale)
  }

  ngOnInit() {
    this.setT(this.localeService.getLocale())
    this.localeService.localeUpdated.subscribe(this.setT.bind(this))

    this.contentForm = this.contentFormService.contentForm;


    if (this.type) {
      // type received from parent-component
      this.contentFormService.initContentForm(this.type);
    } else {
      this.contentFormService.initContentForm('legends');
    }

    if (!this.poiForm) {
      // no poiForm was passed to this component -> get content
      this.id = this.route.snapshot.paramMap.get('id');
      this.type = this.route.snapshot.queryParamMap.get('type');

      if (this.id && this.type) {

        // initialize form based on type
        this.contentFormService.initContentForm(this.type);

        // get content from poi
        this.poiService
          .getContents(this.id)
          .pipe(take(1))
          .subscribe((contents) => {
            this.contents = contents;
            this.contentFormService.update(contents, this.type);
          });
      }

      this.paramSub = this.route.paramMap.subscribe(params => {
        if (params.has('id') && params.has('type')) {
          this.id = params.get('id');
          this.type = params.get('type');
        }
      });

    } else {
      // pass over form to parent-component
      this.contentFormCreated.emit(this.contentFormService.contentForm);

      if (!this.editMode) {
        // change structure of content based on current type
          this.poiForm.controls.type.valueChanges.subscribe((val) => {
          this.contentFormService.initContentForm(val);
      })
    }
    this.parentReset.subscribe((val) => {
      this.contentFormService.reset();
      if (this.editMode) {
        this.contentFormService.update(this.poi.media.content, this.type);
      }
    })
    }
  }

  createHint(lang) {

    const index = this.hints(lang).length;

    this.hints(lang).push(this.fb.group({
      index: [index],
      url: ['']
    }));
  }

  addLang(lang) {
    if (lang !== '') {
      this.contentFormService.addLang(lang, this.type);
    }
  }

  content(lang) {
    return (this.contentForm.get(lang) as FormGroup).controls;
  }

  hints(lang) {
    return (this.contentForm.get(lang).get('puzzle') as FormGroup).controls.hints as FormArray;
  }

  get langs() {
    return Object.keys((this.contentForm.controls)) as Array<string>;
  }

  resetForms() {
    this.contentFormService.reset();
    this.contentFormService.update(this.contents, this.type);
  }

  onSubmit() {
    const contentVal = this.contentForm.value;
    this.poiService.putContents(contentVal, this.id).pipe(take(1)).subscribe(() => {

    });
  }

}
