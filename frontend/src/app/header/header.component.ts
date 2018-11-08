import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core'
import translate from '../translations/translate'
import {LocaleService} from '../locale.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string
  @Output() sidenavToggled: EventEmitter<any> = new EventEmitter()

  localeService: LocaleService
  t
  langs = ['en', 'de']

  constructor(localeService: LocaleService) {
    this.localeService = localeService
    this.t = translate('header', localeService.getLocale())
  }

  ngOnInit() {
  }

  toggleSidenav() {
    this.sidenavToggled.emit()
  }

}
