import {Component, Input, OnInit} from '@angular/core';
import {LocaleService} from "../locale.service";

@Component({
  selector: 'app-poi-overview-map-info-window',
  templateUrl: './poi-overview-map-info-window.component.html',
  styleUrls: ['./poi-overview-map-info-window.component.css']
})
export class PoiOverviewMapInfoWindowComponent implements OnInit {

  @Input() poi

  locale

  constructor(private localeService: LocaleService) {
    this.locale = localeService.getLocale()
    localeService.localeUpdated
      .subscribe(locale => this.locale = locale)
  }

  ngOnInit() {
  }

}
