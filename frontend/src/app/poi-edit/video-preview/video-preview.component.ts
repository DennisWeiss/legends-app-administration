import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';

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
    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
  }


  ngOnInit() {
    // set initial url
    this.videoUrl = this.fileControl.value;
    // check for changes
    this.fileControl.valueChanges.subscribe(() => {
      this.videoUrl = this.fileControl.value;
    })
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === "allAddedToQueue") {
      // when all files added in queue
      const event: UploadInput = {
        type: "uploadAll",
        url: "/upload",
        method: "POST",
        data: { foo: "bar" }
      };
      this.uploadInput.emit(event);
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
    this.fileControl.setValue(files.item(0));
    this.loadFile(files[0]);
}

loadFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    this.videoUrl = reader.result;
  };
  reader.readAsDataURL(file);
}

resetFile() {
  this.fileControl.setValue('');
  this.videoUrl = null;
}

}
