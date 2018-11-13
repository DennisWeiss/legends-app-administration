import { Component, OnInit, Input } from '@angular/core';
import {faPlusCircle, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.css']
})
export class ImgPreviewComponent implements OnInit {

  @Input() name: string;
  fileToUpload: File = null;
  @Input() fileControl: FormControl;

  imgPreviewUrl = null;
  
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  constructor() { }

  ngOnInit() {
  }

  handleFileInput(files) {
      this.fileControl.setValue(files.item(0));
      this.loadFile(files[0]);
  }

  loadFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreviewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  resetFile() {
    this.fileControl.setValue('');
    this.imgPreviewUrl = null;
  }

}
