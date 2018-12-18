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

  poiService: PoiService
  displayedColumns: string[] = ['name', 'coords', 'beaconId', 'edit', 'delete'];
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
    poiService: PoiService,
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackbarService) {
    this.poiService = poiService
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

  editPOI = (poiKey: string, poiType: string) => {
    console.log('event', event);
    this.router.navigate(['edit', poiKey], {queryParams: {type: poiType}});
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

  editContents = (poiKey: string, poiType: string) => {
    this.router.navigate(['edit/content', poiKey], {queryParams: {type: poiType}});
  }

  isAdmin(user) {
    return user.rights.some((right) => right === 'admin');
  }

}
