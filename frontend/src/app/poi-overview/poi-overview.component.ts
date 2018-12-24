import { Component, OnInit } from '@angular/core';
import {take} from "rxjs/operators";
import {PoiService} from "../shared/services/poi.service";


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

  name = "poi-overview"

  pois

  constructor(private poiService: PoiService) { }

  ngOnInit() {
    this.fetchPOIsAndInitTable()
  }

  fetchPOIsAndInitTable() {
    this.poiService.retrievePOIs().pipe(take(1))
      .subscribe(pois => {
        this.pois = mapPOIs(pois)
      })
  }

}
