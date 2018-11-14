import { FormControl } from "@angular/forms";

import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {
  UploaderOptions,
  UploadFile,
  UploadInput,
  UploadOutput
} from "ngx-uploader";

@Component({
  selector: "app-img-preview",
  templateUrl: "./img-preview.component.html",
  styleUrls: ["./img-preview.component.css"]
})
export class ImgPreviewComponent implements OnInit {
  @Input() name: string;
  fileToUpload: File = null;
  @Input() fileControl: FormControl;

  imgPreviewUrl = null;
  imgUploaded = false;
  imgLoaded = false;

  faPlusCircle = faPlusCircle;

  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  dragOver;

  constructor() {
    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
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

  // TODO: Implement manual upload with file explorer
  manualUpload() {}

  ngOnInit() {

    // check for initial url
    this.imgPreviewUrl = this.fileControl.value;

    // listen to changes
    this.fileControl.valueChanges.subscribe(() => {
      this.imgPreviewUrl = this.fileControl.value;
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
    this.fileControl.setValue("");
    this.imgPreviewUrl = null;
  }
}
