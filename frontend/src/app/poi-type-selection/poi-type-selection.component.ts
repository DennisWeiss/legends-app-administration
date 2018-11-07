import {Component, Input, OnInit} from '@angular/core'
import translate from '../translations/translate'
import {LocaleService} from '../locale.service'


@Component({
  selector: 'app-poi-type-selection',
  templateUrl: './poi-type-selection.component.html',
  styleUrls: ['./poi-type-selection.component.css']
})
export class PoiTypeSelectionComponent implements OnInit {

  @Input() types
  @Input() onChange: (type: string) => void
  t
  objectKeys = Object.keys

  constructor(localeService: LocaleService) {
    this.t = translate('poi-type-selection', localeService.getLocale())
  }

  ngOnInit() {
  }

}
