import {Component, Input, OnInit} from '@angular/core';
import { icon, latLng, Map, marker, point, polyline, tileLayer } from 'leaflet';
import { environment } from '../../../environments/environment';

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
    zoom: environment.map.defaultZoom,
    center: latLng(environment.map.defaultCenter)
  };


  constructor() { }

  ngOnInit() {
  }

}
