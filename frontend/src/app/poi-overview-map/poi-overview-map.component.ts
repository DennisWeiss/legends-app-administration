import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-poi-overview-map',
  templateUrl: './poi-overview-map.component.html',
  styleUrls: ['./poi-overview-map.component.css']
})
export class PoiOverviewMapComponent implements OnInit {

  @Input() pois

  position = environment.map.defaultCenter
  defaultZoom = 12

  mapTypeControlOptions = {};

  constructor() { }

  ngOnInit() {
  }

}
