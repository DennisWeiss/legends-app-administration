import { FormControl } from '@angular/forms';

import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {
  UploaderOptions,
  UploadFile,
  UploadInput,
  UploadOutput
} from 'ngx-uploader';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.css']
})
export class ImgPreviewComponent implements OnInit {
  @Input() name: string;
  @Input() fileControl: FormControl;
  @Input() width = 133;
  @Input() height = 100;

  imgPreviewUrl = null;
  imgLoaded = false;

  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  dragOver;

  constructor() {
    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      this.imgLoaded = true;
    } else if (
      output.type === 'addedToQueue' &&
      typeof output.file !== 'undefined'
    ) {
      // add file to array when added
      this.files.push(output.file);
      this.handleFileInput([output.file.nativeFile]);
    } else if (
      output.type === 'uploading' &&
      typeof output.file !== 'undefined'
    ) {
      // update current data in files array for uploading file
      const index = this.files.findIndex(
        file => typeof output.file !== 'undefined' && file.id === output.file.id
      );
      this.files[index] = output.file;
      this.handleFileInput([output.file.nativeFile]);
      } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
      this.imgPreviewUrl = null;
      this.fileControl.setValue(null);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
      this.imgPreviewUrl = null;
      this.fileControl.setValue(null);
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  // TODO: Implement manual upload with file explorer
  manualUpload() {}

  ngOnInit() {

    // check for initial url
    this.imgPreviewUrl = this.fileControl.value;

    // listen to changes
    this.fileControl.valueChanges.subscribe(() => {
      const val = this.fileControl.value;
      if (typeof val === 'string' || !val) {
        this.imgPreviewUrl = this.fileControl.value;
      }
    })
  }

  handleFileInput(files: FileList | File[]) {
    if (files[0]) {
      this.fileControl.setValue(files[0]);
      this.loadFile(files[0]);
    }
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
