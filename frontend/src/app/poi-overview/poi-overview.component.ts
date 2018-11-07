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



@Component({
  selector: 'app-poi-overview',
  templateUrl: './poi-overview.component.html',
  styleUrls: ['./poi-overview.component.css']
})
export class PoiOverviewComponent implements OnInit {

  poiService: PoiService
  displayedColumns: string[] = ['name', 'coords', 'beaconId', 'edit']
  pois
  faPen = faPen
  faPlusCircle = faPlusCircle
  typeToColor = {
    legends: 'blue',
    sights: 'orange',
    restaurants: 'green'
  }
  formatcoords = formatcoords

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(poiService: PoiService) {
    this.poiService = poiService
  }

  ngOnInit() {
    this.poiService.retrievePOIs()
      .subscribe(pois => {
        console.log(pois);
        this.pois = new MatTableDataSource(mapPOIs(pois))
        this.pois.paginator = this.paginator
        this.pois.sort = this.sort
        this.pois.sortingDataAccessor = (poi, property) => {
          switch (property) {
            case 'name': return poi.name.en
            default: return poi[property]
          }
        }
        this.pois.filterPredicate = (poi, filter: string) => {
          console.log(poi)
          return poi.name && poi.name.en && poi.name.en.toLowerCase().includes(filter.toLowerCase())
        }
      })
  }



}
