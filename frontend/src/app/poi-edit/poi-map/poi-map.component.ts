import {Component, Input, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { icon, latLng, marker, tileLayer, latLngBounds, LeafletMouseEvent } from 'leaflet';
import { environment } from '../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poi-map',
  templateUrl: './poi-map.component.html',
  styleUrls: ['./poi-map.component.css']
})
export class PoiMapComponent implements OnInit, OnDestroy {

  @Output() coordsChanged = new EventEmitter<any>();

  @Input() coordsForm: FormGroup;

  map;
  locMarker;

  coordsSub: Subscription;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),
    ],
    zoom: environment.map.defaultZoom,
    center: latLng(environment.map.defaultCenter),
  };


  constructor() { }

  ngOnInit() {}

  onMapReady(map) {
    // get a local reference to the map as we need it later
    this.map = map;
    const lat = this.coordsForm.controls.lat.value || 0;
    const lng = this.coordsForm.controls.lng.value || 0;
    this.addMarker(lat, lng);

    this.coordsSub = this.coordsForm.valueChanges.subscribe((coords) => {
      this.addMarker(coords.lat || 0, coords.lng || 0);
    })
  }

  handleClick(event) {
    const ev = event as LeafletMouseEvent;

    this.addMarker(ev.latlng.lat, ev.latlng.lng);

    this.coordsChanged.emit(ev.latlng);

  }

  addMarker(lat, lng) {

    if(this.locMarker) {
      this.locMarker.removeFrom(this.map);
    }

    this.locMarker = marker([ lat, lng ], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });

    this.locMarker.addTo(this.map);
  }

  ngOnDestroy() {
    this.coordsSub.unsubscribe();
  }

}
