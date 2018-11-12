import { Component, OnInit, Input } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.css']
})
export class VideoPreviewComponent implements OnInit {

  @Input() name: string;

  imgLoaded = true;
  faPlusCircle = faPlusCircle;

  constructor() { }

  ngOnInit() {
  }

}
