import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { icon, latLng, Map, marker, point, polyline, tileLayer, latLngBounds, LeafletMouseEvent } from 'leaflet';
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

  @Output() coordsChanged = new EventEmitter<any>();


    // Marker for the top of Mt. Ranier
    summit = marker([ 46.8523, -121.7603 ], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    });

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      this.summit
    ],
    zoom: environment.map.defaultZoom,
    center: latLng(environment.map.defaultCenter),
    maxBounds: this.bounds
  };

  layersControl = {
    overlays: {
      'Mt. Rainier Summit': this.summit,
    }
  };


  constructor() { }

  ngOnInit() {
  }

  handleClick(event) {
    const ev = event as LeafletMouseEvent;
    this.layersControl.overlays['test'] = marker([ ev.latlng.lat, ev.latlng.lng ], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    });
    this.coordsChanged.emit(ev.latlng);
   // console.log('event', ev.latlng) ;
  }

}
