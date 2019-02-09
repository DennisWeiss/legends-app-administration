import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

import { environment } from "src/environments/environment";
import { LocaleService } from "src/app/shared/services/locale.service";


@Component({
  selector: 'app-beacon-overview-map',
  templateUrl: './beacon-overview-map.component.html',
  styleUrls: ['./beacon-overview-map.component.css']
})
export class BeaconOverviewMapComponent implements OnInit {

  @Output() coordsChanged = new EventEmitter<any>();

  @Output() beaconEditAction = new EventEmitter<any>();

  @Input() beacons = [];

  @Input() markerCoords;

  position = environment.map.defaultCenter
  defaultZoom = 12
  locale

  mapTypeControlOptions = {};

  newBeaconMarkerLabel = {
    color: 'green'
  }

  constructor(private localeService: LocaleService) {
    this.locale = localeService.getLocale()
    localeService.localeUpdated
      .subscribe(locale => this.locale = locale)
  }

  ngOnInit() {
  }

  addOrMoveMarker(event) {
    this.coordsChanged.emit(event.coords)
  }

  triggerEdit(beacon) {
    this.beaconEditAction.emit(beacon);
  }

  deleteBeacon(beacon) {
     const index = this.beacons.findIndex(
       (b) => beacon.beaconId === b.beaconId);

     this.beacons.splice(index, 1);
  }

}
