import {Component, OnInit, ViewChild} from '@angular/core'
import {PoiService} from '../poi.service'
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material'
import {faPen, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import translate from '../translations/translate'
import {LocaleService} from '../locale.service'
import formatcoords from 'formatcoords'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';
import SnackbarService from '../snackbar.service';
import * as moment from 'moment'


const mapPOIs = pois => {
  const poiLst = []
  Object.keys(pois).forEach(type => {
    Object.keys(pois[type][type]).forEach(key => {
      poiLst.push(pois[type][type][key])
    })
  })
  return poiLst
}

const typesListOf = types => Object.keys(types).filter(type => types[type].checked)


@Component({
  selector: 'app-poi-overview',
  templateUrl: './poi-overview.component.html',
  styleUrls: ['./poi-overview.component.css']
})
export class PoiOverviewComponent implements OnInit {

  name = 'poi-overview';

  displayedColumns: string[] = [
    'name',
    'coords',
    'beaconId',
    'publishingTimestamp',
    'edit',
    'delete'
  ]
  pois
  filteredPois
  faPen = faPen
  faPlusCircle = faPlusCircle
  typeToColor = {
    legends: 'blue',
    sights: 'orange',
    restaurants: 'green'
  }
  formatcoords = formatcoords

  types = {
    legends: {
      color: 'blue',
      checked: true
    },
    sights: {
      color: 'orange',
      checked: true
    },
    restaurants: {
      color: 'green',
      checked: true
    }
  }

  $authState: Observable<any>;
  isAuth = false;

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    public localeService: LocaleService,
    private poiService: PoiService,
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackbarService) {
    this.localeService.localeUpdated.subscribe(moment.locale)
  }

  initializeTableDataSource = () => {
    this.filteredPois = new MatTableDataSource(this.pois.filter(poi => typesListOf(this.types).includes(poi.type)))
    this.filteredPois.paginator = this.paginator
    this.filteredPois.sort = this.sort
    this.filteredPois.sortingDataAccessor = (poi, property) => {
      switch (property) {
        case 'name': return poi.name.en
        default: return poi[property]
      }
    }
    this.setFilterPredicate()
  }

  ngOnInit() {
   this.fetchPOIsAndInitTable();
    this.$authState = this.authService.authStatusChanged;
  }

  fetchPOIsAndInitTable() {
    this.poiService.retrievePOIs().pipe(take(1))
    .subscribe(pois => {
      this.pois = mapPOIs(pois)
      this.initializeTableDataSource()
    })
  }

  hasBeenPublished = poi => moment().isAfter(moment.unix(poi.publishingTimestamp))

  formatTimestamp = timestamp => {
    const dateTime = moment.unix(timestamp)
    if (moment().isAfter(dateTime)) {
      return dateTime.format('lll')
    }
    return dateTime.fromNow()
  }
    setFilterPredicate = () => {
      this.filteredPois.filterPredicate = (poi, filter: string) => poi.name && poi.name.en &&
        poi.name.en.toLowerCase().includes(filter.toLowerCase())
    }

    onChangeTypeFilter = (type: string) => {
      this.types[type].checked = !this.types[type].checked
      this.initializeTableDataSource()
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

  openEditPage(poiKey: string, poiType: string, user) {
    if (this.authService.hasPermission('EDIT')) {
      this.router.navigate(['edit', poiKey], {queryParams: {type: poiType}});
    } else if (this.authService.hasPermission('EDIT_CONTENT')) {
      this.router.navigate(['edit/content', poiKey], {queryParams: {type: poiType}});
    }
  }

  hasPermission(perm) {
    return this.authService.hasPermission(perm);
  }

}
