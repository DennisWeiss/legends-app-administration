import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {environment} from "../../environments/environment";
import {LocaleService} from "../shared/services/locale.service";

@Component({
  selector: 'app-poi-overview-map',
  templateUrl: './poi-overview-map.component.html',
  styleUrls: ['./poi-overview-map.component.css']
})
export class PoiOverviewMapComponent implements OnInit {

  @Input() pois

  @Output() editPoiAction = new EventEmitter<any>();
  @Output() deletePoiAction = new EventEmitter<any>();

  position = environment.map.defaultCenter
  defaultZoom = 12
  locale

  mapTypeControlOptions = {};

  constructor(private localeService: LocaleService) {
    this.locale = localeService.getLocale()
    localeService.localeUpdated
      .subscribe(locale => this.locale = locale)
  }

  ngOnInit() {
  }

}
