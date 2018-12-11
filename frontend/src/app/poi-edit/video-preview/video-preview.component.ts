import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';
import { loadFile } from 'src/app/utils/fileLoader';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.css']
})
export class VideoPreviewComponent implements OnInit {

  @Input() name: string;
  @Input() fileControl: FormControl;

  faPlusCircle = faPlusCircle;
  videoUrl = null;

  fileToUpload: File = null;
  imgUploaded = false;
  imgLoaded = false;

  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  dragOver;

  constructor() {
    this.files = []; // local uploading files array
  }


  ngOnInit() {
   // check for initial url
   this.videoUrl = this.fileControl.value;

   // listen to changes
   this.fileControl.valueChanges.subscribe(() => {
     const val = this.fileControl.value;
     if (typeof val === 'string' || !val) {
       this.videoUrl = this.fileControl.value;
     }
   })
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === "allAddedToQueue") {
      this.imgLoaded = true;
    } else if (
      output.type === "addedToQueue" &&
      typeof output.file !== "undefined"
    ) {
      // add file to array when added
      this.files.push(output.file);
      this.handleFileInput([output.file.nativeFile]);
    } else if (
      output.type === "uploading" &&
      typeof output.file !== "undefined"
    ) {
      // update current data in files array for uploading file
      const index = this.files.findIndex(
        file => typeof output.file !== "undefined" && file.id === output.file.id
      );
      this.files[index] = output.file;
    } else if (output.type === "removed") {
      // remove file from array when removed
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === "dragOver") {
      this.dragOver = true;
    } else if (output.type === "dragOut") {
      this.dragOver = false;
    } else if (output.type === "drop") {
      this.dragOver = false;
    }
  }

  handleFileInput(files) {
    if (files[0]) {
      this.fileControl.setValue(files[0]);

      // load image for preview
      loadFile(files[0]).then(result => {
        this.videoUrl = result;
      });
    }
}

resetFile() {
  this.fileControl.setValue('');
  this.videoUrl = null;
}

}
