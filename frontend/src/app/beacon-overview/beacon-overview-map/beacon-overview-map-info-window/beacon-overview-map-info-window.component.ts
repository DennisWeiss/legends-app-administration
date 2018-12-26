import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BeaconService } from 'src/app/shared/services/beacon.service';
import { take } from 'rxjs/operators';
import SnackbarService from 'src/app/shared/services/snackbar.service';
import { Beacon } from 'src/app/shared/models/beacon.model';

@Component({
  selector: 'app-beacon-overview-map-info-window',
  templateUrl: './beacon-overview-map-info-window.component.html',
  styleUrls: ['./beacon-overview-map-info-window.component.css']
})
export class BeaconOverviewMapInfoWindowComponent implements OnInit {

  @Input() beacon: Beacon;

  @Output() editTriggered = new EventEmitter<any>();
  @Output() deleteTriggered  = new EventEmitter<any>();

  constructor(private beaconService: BeaconService, private snackbarService: SnackbarService) { }

  ngOnInit() {
  }

  editBeacon() {
    this.editTriggered.emit(this.beacon);
  }

  deleteBeacon() {
    this.beaconService.deleteBeacon(this.beacon.beaconId).pipe(take(1))
    .subscribe((res) => {
      this.snackbarService.openSnackBar(res.message, 'OK');
      this.deleteTriggered.emit(this.beacon);
    })
  }

}
