import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-img-preview-multiple',
  templateUrl: './img-preview-multiple.component.html',
  styleUrls: ['./img-preview-multiple.component.css']
})
export class ImgPreviewMultipleComponent implements OnInit {

  imgLoaded = true;
  faPlusCircle = faPlusCircle;
  images = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8'];

  constructor() { }

  ngOnInit() {
  }

}
