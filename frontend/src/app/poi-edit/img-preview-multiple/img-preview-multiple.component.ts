import { Component, OnInit, Input } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-img-preview-multiple',
  templateUrl: './img-preview-multiple.component.html',
  styleUrls: ['./img-preview-multiple.component.css']
})
export class ImgPreviewMultipleComponent implements OnInit {
  @Input() fileArray: FormArray;

  imgLoaded = true;
  faPlusCircle = faPlusCircle;
  images = [];
  imagePreview = [];

  constructor() {}

  ngOnInit() {

    // set initial url
    this.images = this.fileArray.controls.map((control) => control.value);

    this.fileArray.valueChanges.subscribe(() => {
      this.images = this.fileArray.controls
      .map((control) => control.value)
      .filter((data) => typeof data === 'string');
    })

  }

  handleFileInput(files) {
    for (let i = 0; i < files.length; i++) {
      this.fileArray.push(new FormControl(files.item(i)));
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
