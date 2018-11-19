import {Component, Input, OnInit} from '@angular/core';
import { icon, latLng, Map, marker, point, polyline, tileLayer, latLngBounds } from 'leaflet';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-poi-map',
  templateUrl: './poi-map.component.html',
  styleUrls: ['./poi-map.component.css']
})
export class PoiMapComponent implements OnInit {

  corner1 = latLng(51.16, 14.99 );
  corner2 = latLng(51.18, 15.01);
  bounds =  latLngBounds(this.corner1, this.corner2);

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: environment.map.defaultZoom,
    center: latLng(environment.map.defaultCenter),
    maxBounds: this.bounds
  };


  constructor() { }

  ngOnInit() {
  }

  handleClick(event) {
    console.log('event', event);
  }

}
