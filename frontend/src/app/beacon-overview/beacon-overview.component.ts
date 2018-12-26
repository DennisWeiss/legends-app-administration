import { Component, OnInit, ViewChild } from '@angular/core';
import { BeaconService } from '../shared/services/beacon.service';
import { take } from 'rxjs/operators';
import { Beacon } from '../shared/models/beacon.model';
import SnackbarService from '../shared/services/snackbar.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-beacon-overview',
  templateUrl: './beacon-overview.component.html',
  styleUrls: ['./beacon-overview.component.css']
})
export class BeaconOverviewComponent implements OnInit {

  @ViewChild('form') form;

  editMode = false;
  beacon: Beacon = {
    name: '',
    beaconId: null,
    coordinates: {
      lat: null,
      lng: null
    }
  };

  fetchedBeacons: Beacon[] = [];

  constructor(private beaconService: BeaconService, private snackbarService: SnackbarService) { }

  ngOnInit() {

    this.beaconService.getBeacons().pipe(take(1)).subscribe((beacons: Beacon[]) => {
      this.fetchedBeacons = beacons;
    })

  }

  activateEditMode(beacon: Beacon) {
    this.editMode = true;
    this.beacon = beacon;
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
    this.resetForm();

  }

  resetForm() {

    this.form.resetForm();

    /*this.beacon = {
      name: '',
      beaconId: null,
      coordinates: {
        lat: null,
        lng: null
      }
    }*/
  }
}
