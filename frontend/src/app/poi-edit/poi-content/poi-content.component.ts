import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poi-content',
  templateUrl: './poi-content.component.html',
  styleUrls: ['./poi-content.component.css']
})
export class PoiContentComponent implements OnInit {

  langs = ['DE', 'EN', 'PL'];

  hints = [1];

  constructor() { }

  ngOnInit() {
  }

  createHint() {
    this.hints.push(this.hints.length + 1);
  }

}
