import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-poi-filter',
  templateUrl: './poi-filter.component.html',
  styleUrls: ['./poi-filter.component.css']
})
export class PoiFilterComponent implements OnInit {

  @Input() pois

  constructor() { }

  ngOnInit() {
  }

  applyFilter = (filterValue: string) => {
    this.pois.filter = filterValue.trim().toLowerCase()

    if (this.pois.paginator) {
      this.pois.paginator.firstPage()
    }
  }

}
