import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocaleService } from '../../locale.service';
import translate from 'src/app/translations/translate';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ContentFormService } from './content-form.service';
import { ActivatedRoute } from '@angular/router';
import { PoiService } from 'src/app/poi.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poi-content',
  templateUrl: './poi-content.component.html',
  styleUrls: ['./poi-content.component.css']
})
export class PoiContentComponent implements OnInit {

  t;
  @Input() type: string;
  @Input() poiForm: FormGroup;
  @Output() contentFormCreated: EventEmitter<FormGroup> = new EventEmitter();

  contentForm: FormGroup;

  id: string;
  contents;

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
      this.contentFormService.initContentForm(this.type);
    } else {
      this.contentFormService.initContentForm('legends');
    }

    if (!this.poiForm) {
      // no poiForm was passed to this component
      this.id = this.route.snapshot.paramMap.get('id');
      this.type = this.route.snapshot.queryParamMap.get('type');

      if (this.id && this.type) {

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
      this.contentFormCreated.emit(this.contentFormService.contentForm);
    }

    this.contentFormService.contentForm.valueChanges
    .subscribe((val) => {
      console.log('contentForm', val);
   });

  }

  createHint(lang) {

    const index = this.hints(lang).length;

    this.hints(lang).push(this.fb.group({
      index: [index],
      url: ['']
    }));
  }

  addLang() {

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

}
