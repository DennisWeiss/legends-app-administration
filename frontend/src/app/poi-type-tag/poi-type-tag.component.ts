import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-poi-type-tag',
  templateUrl: './poi-type-tag.component.html',
  styleUrls: ['./poi-type-tag.component.css']
})
export class PoiTypeTagComponent implements OnInit {

  name = "poi-type-tag"

  @Input() type: string

  typeToColor = {
    legends: 'blue',
    sights: 'orange',
    restaurants: 'green'
  }

  constructor() { }

  ngOnInit() {
  }

}
