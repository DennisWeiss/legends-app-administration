import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-poi-type-selection',
  templateUrl: './poi-type-selection.component.html',
  styleUrls: ['./poi-type-selection.component.css']
})
export class PoiTypeSelectionComponent implements OnInit {

  @Input() types
  @Input() onChange: (type: string) => void

  objectKeys = Object.keys

  constructor() { }

  ngOnInit() {
  }

}
