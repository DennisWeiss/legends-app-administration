import { Component, OnInit, Input } from '@angular/core';
import { LocaleService } from '../../locale.service';
import translate from 'src/app/translations/translate';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-poi-content',
  templateUrl: './poi-content.component.html',
  styleUrls: ['./poi-content.component.css']
})
export class PoiContentComponent implements OnInit {

  t;
  langs = ['de', 'en', 'pl'];
  @Input() type: string;
  @Input() contentForm: FormGroup;

  constructor(
    public localeService: LocaleService,
    private fb: FormBuilder
    ) { }

  setT(locale: string) {
    this.t = translate('poi-content', locale)
  }

  ngOnInit() {
    this.setT(this.localeService.getLocale())
    this.localeService.localeUpdated.subscribe(this.setT.bind(this))
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

}
