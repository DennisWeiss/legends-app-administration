import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoiEditComponent } from './poi-edit.component';
import { PoiMapComponent } from './poi-map/poi-map.component';
import { ImgPreviewComponent } from './img-preview/img-preview.component';
import { ImgPreviewMultipleComponent } from './img-preview-multiple/img-preview-multiple.component';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { HtmlEditorComponent } from './html-editor/html-editor.component';
import { PoiContentComponent } from './poi-content/poi-content.component';
import { MediaSectionComponent } from './media-section/media-section.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { UploadStatusDialogComponent } from './upload-status-dialog/upload-status-dialog.component';

@NgModule({
  declarations: [
    PoiEditComponent,
    PoiMapComponent,
    ImgPreviewComponent,
    ImgPreviewMultipleComponent,
    VideoPreviewComponent,
    HtmlEditorComponent,
    PoiContentComponent,
    MediaSectionComponent,
    StatusBarComponent,
    UploadStatusDialogComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class PoiEditModule { }
