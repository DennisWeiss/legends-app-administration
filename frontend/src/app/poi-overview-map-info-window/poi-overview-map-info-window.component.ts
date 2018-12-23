import {Component, Input, OnInit} from '@angular/core';
import {LocaleService} from "../locale.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-poi-overview-map-info-window',
  templateUrl: './poi-overview-map-info-window.component.html',
  styleUrls: ['./poi-overview-map-info-window.component.css']
})
export class PoiOverviewMapInfoWindowComponent implements OnInit {

  name = "poi-overview-map-info-window"

  @Input() poi
  locale

  constructor(private localeService: LocaleService, private router: Router) {
    this.locale = localeService.getLocale()
    localeService.localeUpdated
      .subscribe(locale => this.locale = locale)
  }

  ngOnInit() {
  }

  editPOI = (poiKey: string, poiType: string) => {
    this.router.navigate(['edit', poiKey], {queryParams: {type: poiType}});
  }

}
