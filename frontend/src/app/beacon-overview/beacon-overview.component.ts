import { Component, OnInit, ViewChild } from '@angular/core';
import { BeaconService } from '../shared/services/beacon.service';
import { take } from 'rxjs/operators';
import { Beacon } from '../shared/models/beacon.model';
import SnackbarService from '../shared/services/snackbar.service';
import { TranslatePipe } from '../shared/pipes/translations.pipe';
import {LocaleService} from "../shared/services/locale.service";


@Component({
  selector: 'app-beacon-overview',
  templateUrl: './beacon-overview.component.html',
  styleUrls: ['./beacon-overview.component.css']
})

export class BeaconOverviewComponent implements OnInit {

  componentName = 'beacon-overview'

  @ViewChild('form') form;

  editMode = false;

  savedBeacon: Beacon;
  beacon: Beacon = {
    name: '',
    beaconId: null,
    coordinates: {
      lat: null,
      lng: null
    }
  };

  fetchedBeacons: Beacon[] = [];

  constructor(private beaconService: BeaconService,
              private snackbarService: SnackbarService) {
  }

  ngOnInit() {

    this.beaconService.getBeacons().pipe(take(1)).subscribe((beacons: Beacon[]) => {
      this.fetchedBeacons = beacons;
    })

  }

  activateEditMode(beacon: Beacon) {
    this.editMode = true;
    this.beacon = beacon;
    this.savedBeacon = {...beacon};
  }

  saveBeacon() {
    this.beaconService.changeBeacon(this.beacon).pipe(take(1))
    .subscribe((res) => {
      this.snackbarService.openSnackBar(res.message, 'OK');
      this.editMode = false;

      const index = this.fetchedBeacons.findIndex(
        (beacon) => res.beacon.beaconId === beacon.beaconId);

        this.fetchedBeacons[index] = res.beacon;
        this.resetForm();
    });
  }

  createBeacon() {
    this.beaconService.addBeacon(this.beacon).pipe(take(1))
    .subscribe((res) => {
      this.snackbarService.openSnackBar(res.message, 'OK');
      this.fetchedBeacons.push(res.beacon);
      this.resetForm();
    })
  }

  cancelEdit() {
    this.editMode = false;

    // reset properties
    this.beacon.name = this.savedBeacon.name;
    this.beacon.beaconId = this.savedBeacon.beaconId;
    this.beacon.coordinates = this.savedBeacon.coordinates;

    // delete reference
    delete this.beacon;

    this.resetForm();
  }

  resetForm() {

     //set default values
     this.beacon = {
      name: '',
      beaconId: null,
      coordinates: {
        lat: null,
        lng: null
      }
    }


   // reset state of form (errors, dirty, touched, ...)
    this.form.resetForm();
  }
}
