import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core'
import translate from '../translations/translate'
import {LocaleService} from '../locale.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name = 'header';

  @Input() title: string
  @Output() sidenavToggled: EventEmitter<any> = new EventEmitter()

  langs = ['en', 'de']

  constructor(public localeService: LocaleService) {}


  ngOnInit() {}

  toggleSidenav() {
    this.sidenavToggled.emit()
  }

}
