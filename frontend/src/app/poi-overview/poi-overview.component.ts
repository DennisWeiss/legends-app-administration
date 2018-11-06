import { Component, OnInit } from '@angular/core';
import {PoiService} from '../poi.service'

const mapPOIs = pois => {
  const poiLst = []
  Object.keys(pois).forEach(type => {
    Object.keys(pois[type][type]).forEach(key => {
      poiLst.push(pois[type][type][key])
    })
  })
  return poiLst
}

@Component({
  selector: 'app-poi-overview',
  templateUrl: './poi-overview.component.html',
  styleUrls: ['./poi-overview.component.css']
})
export class PoiOverviewComponent implements OnInit {

  poiService: PoiService

  displayedColumns: string[] = ['key', 'icon', 'name', 'beaconId']
  pois

  constructor(poiService: PoiService) {
    this.poiService = poiService
  }

  ngOnInit() {
    this.poiService.retrievePOIs()
      .subscribe(pois => this.pois = mapPOIs(pois))
  }

}
