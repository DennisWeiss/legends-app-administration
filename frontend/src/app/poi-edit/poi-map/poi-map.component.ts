import {Component, Input, EventEmitter, Output} from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup } from '@angular/forms';
import {MapTypeControlStyle} from "@agm/core/services/google-maps-types";

@Component({
  selector: 'app-poi-map',
  templateUrl: './poi-map.component.html',
  styleUrls: ['./poi-map.component.css']
})
export class PoiMapComponent {

  @Output() coordsChanged = new EventEmitter<any>();

  @Input() coordsForm: FormGroup;

  position = environment.map.defaultCenter
  defaultZoom = 11

  mapTypeControlOptions = {};


  constructor() { }

  addOrMoveMarker(event) {
    this.coordsChanged.emit(event.coords)
  }

  markerIsSet = () => this.coordsForm.controls.lat.value != null || this.coordsForm.controls.lng.value != null


}
