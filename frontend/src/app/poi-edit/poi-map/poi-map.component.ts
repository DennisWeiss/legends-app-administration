import {Component, Input, OnInit} from '@angular/core';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import appConf from '../../../../app-conf'

@Component({
  selector: 'app-poi-map',
  templateUrl: './poi-map.component.html',
  styleUrls: ['./poi-map.component.css']
})
export class PoiMapComponent implements OnInit {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: appConf.map.defaultZoom,
    center: latLng(appConf.map.defaultCenter)
  };


  constructor() { }

  ngOnInit() {
  }

}
