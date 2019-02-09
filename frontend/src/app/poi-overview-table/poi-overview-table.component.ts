import {Component, Input, OnChanges, OnInit, ViewChild, EventEmitter, Output} from '@angular/core'
import {PoiService} from '../shared/services/poi.service'
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material'
import {faPen, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import translate from '../translations/translate'
import {LocaleService} from '../shared/services/locale.service'
import formatcoords from 'formatcoords'
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {take} from 'rxjs/operators';
import {SnackbarService} from '../shared/services/snackbar.service';
import * as moment from 'moment'




const typesListOf = types => Object.keys(types).filter(type => types[type].checked)


@Component({
  selector: 'app-poi-overview-table',
  templateUrl: './poi-overview-table.component.html',
  styleUrls: ['./poi-overview-table.component.css']
})
export class PoiOverviewTableComponent implements OnInit, OnChanges {

  name = 'poi-overview-table';

  displayedColumns: string[] = [
    'name',
    'coords',
    'beaconId',
    'publishingTimestamp',
    'edit',
    'delete'
  ]

  @Input() pois
  @Input() loading

  @Output() editPoiAction = new EventEmitter<any>();
  @Output() deletePoiAction = new EventEmitter<any>();

  filteredPois
  faPen = faPen
  faPlusCircle = faPlusCircle

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
  locale: string

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(
    public localeService: LocaleService,
    private poiService: PoiService,
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackbarService) {
    this.updateLocale(this.localeService.getLocale())
    this.localeService.localeUpdated.subscribe(this.updateLocale.bind(this))
  }

  updateLocale(locale) {
    moment.locale(locale)
    this.locale = locale
  }

  initializeTableDataSource = () => {
    this.filteredPois = new MatTableDataSource(this.pois.filter(poi => typesListOf(this.types).includes(poi.type)))
    this.filteredPois.paginator = this.paginator
    this.filteredPois.sort = this.sort
    this.filteredPois.sortingDataAccessor = (poi, property) => {
      switch (property) {
        case 'name':
          return poi.name.en
        default:
          return poi[property]
      }
    }
    this.setFilterPredicate()
  }

  ngOnInit() {
    this.$authState = this.authService.authStatusChanged;
  }

  ngOnChanges() {
    if (this.pois) {
      this.initializeTableDataSource()
    }
  }

  setFilterPredicate = () => {
    this.filteredPois.filterPredicate = (poi, filter: string) => poi.media && poi.media.content &&
      poi.media.content[this.locale] && poi.media.content[this.locale].name &&
      poi.media.content[this.locale].name.toLowerCase().includes(filter.toLowerCase())
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

        const index = this.pois.findIndex((p) => p.key === poi.key );
        this.pois.splice(index, 1);
        this.initializeTableDataSource();
      });
    }
  }

  hasPermission(perm) {
    return this.authService.hasPermission(perm);
  }

}
