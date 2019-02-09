import { Component, OnInit } from '@angular/core';
import {take} from "rxjs/operators";
import {PoiService} from "../shared/services/poi.service";
import { SnackbarService}  from '../shared/services/snackbar.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


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
  loading = false

  constructor(private poiService: PoiService,
    private router: Router,
    private snackBarService: SnackbarService,
    private authService: AuthService ) { }

  ngOnInit() {
    this.fetchPOIs()
  }

  fetchPOIs() {
    this.loading = true
    this.poiService.retrievePOIs().pipe(take(1))
      .subscribe(pois => {
        this.loading = false
        this.pois = mapPOIs(pois)
      })
  }

  newPOI = () => {
    this.router.navigate(['new']);
  }

  removePOI = (poi) => {
    if (window.confirm('Do you really want to delete this POI?')) {
      this.poiService.deletePOI(poi.key).subscribe((res) => {
        this.snackBarService.openSnackBar(res.message, 'OK');
        this.fetchPOIs();
      });
    }
  }

  openEditPage(poiKey: string, poiType: string) {
    if (this.authService.hasPermission('EDIT')) {
      this.router.navigate(['edit', poiKey], {queryParams: {type: poiType}});
    } else if (this.authService.hasPermission('EDIT_CONTENT')) {
      this.router.navigate(['edit/content', poiKey], {queryParams: {type: poiType}});
    }
  }

}
