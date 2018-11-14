import { Component, OnInit } from '@angular/core';
import { LocaleService } from '../../locale.service';
import translate from 'src/app/translations/translate';
@Component({
  selector: 'app-poi-content',
  templateUrl: './poi-content.component.html',
  styleUrls: ['./poi-content.component.css']
})
export class PoiContentComponent implements OnInit {

  t;
  langs = ['DE', 'EN', 'PL'];

  hints = [1];

  constructor(public localeService: LocaleService) { }

  setT(locale: string) {
    this.t = translate('poi-content', locale)
  }

  ngOnInit() {
    this.setT(this.localeService.getLocale())
    this.localeService.localeUpdated.subscribe(this.setT.bind(this))
  }

  createHint() {
    this.hints.push(this.hints.length + 1);
  }

}
