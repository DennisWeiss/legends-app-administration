import { Component, OnInit, Input } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-img-preview-multiple',
  templateUrl: './img-preview-multiple.component.html',
  styleUrls: ['./img-preview-multiple.component.css']
})
export class ImgPreviewMultipleComponent implements OnInit {
  @Input() fileControl: FormControl;

  imgLoaded = true;
  faPlusCircle = faPlusCircle;
  images = [];

  constructor() {}

  ngOnInit() {

    // set initial url
    this.images = this.fileControl.value;
    // listen to changes
    this.fileControl.valueChanges.subscribe(() => {
      this.images = this.fileControl.value;
    })
  }

  handleFileInput(files) {
    for (let i = 0; i < files.length; i++) {
      this.fileControl.value.push(files.item(i));
      this.loadFile(files[i]);
    }
  }

  loadFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.images.push(reader.result);
    };
    reader.readAsDataURL(file);
  }
}
