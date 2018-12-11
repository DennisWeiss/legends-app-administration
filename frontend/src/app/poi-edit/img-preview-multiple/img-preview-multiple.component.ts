import { Component, OnInit, Input } from "@angular/core";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FormArray, FormControl } from "@angular/forms";
import {
  UploaderOptions,
  UploadFile,
  UploadInput,
  UploadOutput
} from "ngx-uploader";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { loadFile } from "src/app/utils/fileLoader";

@Component({
  selector: "app-img-preview-multiple",
  templateUrl: "./img-preview-multiple.component.html",
  styleUrls: ['./img-preview-multiple.component.css']
})
export class ImgPreviewMultipleComponent implements OnInit {
  @Input() fileArray: FormArray;

  imgLoaded = true;
  faPlusCircle = faPlusCircle;
  images = [];
  imagePreview = [];
  oldImage = '';

  imgBuffer = new Map();

  constructor() {}

  ngOnInit() {

    window.addEventListener('dragover', function(e) {
      e.preventDefault();
    }, false);
    window.addEventListener('drop', function(e) {
      e.preventDefault();
    }, false)

    // set initial url
    this.images = this.fileArray.controls.map((control, index) => {
      return { preview: control.value, index: index };
    });

    this.fileArray.valueChanges.subscribe(async () => {
      this.images = await Promise.all(this.fileArray.controls.map(async (control, index) => {
        let preview = control.value;

        if (typeof preview !== 'string') { // implying value is a file
          if (!this.imgBuffer.has(preview.name)) {
            // load and add img-preview to buffer
            this.imgBuffer.set(preview.name, await loadFile(preview));
          }
          preview = this.imgBuffer.get(preview.name);
        }
        return { preview: preview, index: index };
      })
      )
    });
  }

  onUploadOutput(output: UploadOutput): void {
   if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.handleFileInput([output.file.nativeFile]);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
  }

  handleFileInput(files) {
    for (let i = 0; i < files.length; i++) {
        this.fileArray.push(new FormControl(files[i]));
    }
  }


  onDragEnd(image) {
    const index = this.images.findIndex((el) => el === image);
    this.images.splice(index, 1);
    this.fileArray.removeAt(image.index);
  }

  onDrop(event) {

  }

}
