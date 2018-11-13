import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {LocaleService} from "../locale.service";
import translate from "../translations/translate";

@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css']
})
export class PoiEditComponent implements OnInit {

  poiTypes = ['restaurant', 'legend', 'sights'];
  langs = ['DE', 'EN', 'PL'];
  localeService: LocaleService
  t

  poiForm = new FormGroup({
    name: new FormControl(''),
    beaconId: new FormControl(''),
    coordinates: new FormGroup({
      lat: new FormControl(''),
      long: new FormControl('')
    })
  });

  constructor(localeService: LocaleService) {
    this.localeService = localeService
    this.setT(this.localeService.getLocale())
  }

  setT(locale: string) {
    this.t = translate('poi-edit', locale)
  }

  ngOnInit() {
    this.localeService.localeUpdated.subscribe(this.setT.bind(this))
  }
}
