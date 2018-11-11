import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-poi-edit',
  templateUrl: './poi-edit.component.html',
  styleUrls: ['./poi-edit.component.css']
})
export class PoiEditComponent implements OnInit {

  poiTypes = ['restaurant', 'legend', 'sights'];

  constructor() { }

  ngOnInit() {
  }

}
