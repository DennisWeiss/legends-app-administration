import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css']
})
export class PoiEditComponent implements OnInit {

  poiTypes = ['restaurant', 'legend', 'sights'];
  langs = ['DE', 'EN', 'PL'];

  poiForm = new FormGroup({
    name: new FormControl(''),
    beaconId: new FormControl(''),
    coordinates: new FormGroup({
      lat: new FormControl(''),
      long: new FormControl('')
    })
  });

  constructor() { }

  ngOnInit() {
  }

}
