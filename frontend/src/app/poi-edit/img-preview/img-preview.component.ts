import { Component, OnInit, Input } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.css']
})
export class ImgPreviewComponent implements OnInit {

  @Input() name: string;

  imgLoaded = true;
  faPlusCircle = faPlusCircle;

  constructor() { }

  ngOnInit() {
  }

}
