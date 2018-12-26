import { Component, OnInit } from '@angular/core';
import {take} from "rxjs/operators";
import {PoiService} from "../shared/services/poi.service";
import SnackbarService from '../shared/services/snackbar.service';
import { Router } from '@angular/router';


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

  name = 'poi-overview'
  pois

  constructor(private poiService: PoiService,
    private router: Router,
    private snackBarService: SnackbarService ) { }

  ngOnInit() {
    this.fetchPOIsAndInitTable()
  }

  fetchPOIsAndInitTable() {
    this.poiService.retrievePOIs().pipe(take(1))
      .subscribe(pois => {
        this.pois = mapPOIs(pois)
      })
  }

  newPOI = () => {
    this.router.navigate(['new']);
  }

  removePOI = (ev: Event, poi) => {
    ev.stopPropagation();
    if (window.confirm('Do you really want to delete this POI?')) {
      this.poiService.deletePOI(poi.key).subscribe((res) => {
        this.snackBarService.openSnackBar(res.message, 'OK');
        this.fetchPOIsAndInitTable();
      });
    }
  }

}
