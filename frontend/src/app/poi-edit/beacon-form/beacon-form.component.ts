import { Component, OnInit, Input } from '@angular/core';
import { BeaconService } from 'src/app/shared/services/beacon.service';
import { take, startWith, map } from 'rxjs/operators';
import { Beacon } from 'src/app/shared/models/beacon.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-beacon-form',
  templateUrl: './beacon-form.component.html',
  styleUrls: ['./beacon-form.component.css']
})
export class BeaconFormComponent implements OnInit {

  // name used for i18n
  name = 'poi-edit';

  @Input() beaconForm: FormControl;

  beacons: Beacon[];
  filteredBeacons: Observable<Beacon[]>;

  constructor(private beaconService: BeaconService) { }

  ngOnInit() {
    this.updateBeacons()
  }

  public updateBeacons() {
    this.beaconService.getBeacons().pipe(take(1)).subscribe((res) => {
      this.beacons = res;
      this.filteredBeacons = this.beaconForm.valueChanges
        .pipe(
          startWith(''),
          map(beacon => beacon ? this._filterStates(beacon) : this.beacons.slice())
        );
    })
  }

  private _filterStates(value: string): Beacon[] {
    const filterValue = value.toString().toLowerCase();

    return this.beacons.filter(
      beacon =>
      beacon.name.toLowerCase().indexOf(filterValue) === 0 ||
      beacon.beaconId.toString().indexOf(filterValue) === 0
      );
  }
}
