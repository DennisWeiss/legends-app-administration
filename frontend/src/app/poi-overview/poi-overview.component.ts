import {Component, OnInit, ViewChild} from '@angular/core'
import {PoiService} from '../poi.service'
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material'
import {faPen, faPlusCircle} from '@fortawesome/free-solid-svg-icons'

const formatcoords = require('formatcoords');


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

  poiService: PoiService
  displayedColumns: string[] = ['name', 'coords', 'beaconId', 'edit']
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

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(poiService: PoiService) {
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
    this.poiService.retrievePOIs()
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


}
