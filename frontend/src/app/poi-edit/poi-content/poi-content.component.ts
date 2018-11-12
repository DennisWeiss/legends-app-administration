import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poi-content',
  templateUrl: './poi-content.component.html',
  styleUrls: ['./poi-content.component.css']
})
export class PoiContentComponent implements OnInit {

  langs = ['DE', 'EN', 'PL'];

  constructor() { }

  ngOnInit() {
  }

}
