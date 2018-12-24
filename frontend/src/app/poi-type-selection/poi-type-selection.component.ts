import {Component, Input, OnInit} from '@angular/core'
import translate from '../translations/translate'
import {LocaleService} from '../shared/services/locale.service'


@Component({
  selector: 'app-poi-type-selection',
  templateUrl: './poi-type-selection.component.html',
  styleUrls: ['./poi-type-selection.component.css']
})
export class PoiTypeSelectionComponent implements OnInit {

  @Input() types
  @Input() onChange: (type: string) => void
  localeService: LocaleService
  t
  objectKeys = Object.keys

  constructor(localeService: LocaleService) {
    this.localeService = localeService
    this.setT(localeService.getLocale())
  }

  setT(locale: string) {
    this.t = translate('poi-type-selection', locale)
  }

  ngOnInit() {
    this.localeService.localeUpdated.subscribe(this.setT.bind(this))
  }

}
