import { Component, OnInit, Input } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { FormGroup, FormControl } from '@angular/forms';

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
    this.videoUrl = reader.result;
  };
  reader.readAsDataURL(file);
}

resetFile() {
  this.fileControl.setValue('');
  this.videoUrl = null;
}

}
