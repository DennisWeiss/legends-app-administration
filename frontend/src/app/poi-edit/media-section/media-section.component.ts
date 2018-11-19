import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-media-section',
  templateUrl: './media-section.component.html',
  styleUrls: ['./media-section.component.css']
})
export class MediaSectionComponent implements OnInit {

  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
