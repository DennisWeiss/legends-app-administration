import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {PoiOverviewComponent} from './poi-overview/poi-overview.component'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {HeaderComponent} from './header/header.component'
import {FlexLayoutModule} from '@angular/flex-layout';
import {TagComponent} from './tag/tag.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PoiFilterComponent} from './poi-filter/poi-filter.component';
import {PoiTypeSelectionComponent} from './poi-type-selection/poi-type-selection.component';
import {PoiEditComponent} from './poi-edit/poi-edit.component';
import {PoiMapComponent} from './poi-edit/poi-map/poi-map.component';
import {ImgPreviewComponent} from './poi-edit/img-preview/img-preview.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ImgPreviewMultipleComponent} from './poi-edit/img-preview-multiple/img-preview-multiple.component';
import {VideoPreviewComponent} from './poi-edit/video-preview/video-preview.component';
import {HtmlEditorComponent} from './poi-edit/html-editor/html-editor.component';
import {QuillModule} from 'ngx-quill';
import {PoiContentComponent} from './poi-edit/poi-content/poi-content.component'
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MediaSectionComponent} from './poi-edit/media-section/media-section.component';
import {NgxUploaderModule} from "ngx-uploader";
import { TokenInterceptor } from './auth/token.interceptor';
import { StatusBarComponent } from './poi-edit/status-bar/status-bar.component';
import { UploadStatusDialogComponent } from './poi-edit/upload-status-dialog/upload-status-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PoiOverviewComponent,
    SignupComponent,
    LoginComponent,
    SidenavComponent,
    HeaderComponent,
    TagComponent,
    PoiFilterComponent,
    PoiTypeSelectionComponent,
    PoiEditComponent,
    PoiMapComponent,
    ImgPreviewComponent,
    ImgPreviewMultipleComponent,
    VideoPreviewComponent,
    HtmlEditorComponent,
    PoiContentComponent,
    MediaSectionComponent,
    StatusBarComponent,
    UploadStatusDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FontAwesomeModule,
    LeafletModule.forRoot(),
    QuillModule,
    ReactiveFormsModule,
    FormsModule,
    NgxUploaderModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [UploadStatusDialogComponent]
})
export class AppModule {
}
