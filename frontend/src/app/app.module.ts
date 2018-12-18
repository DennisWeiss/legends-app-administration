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
import {NgxUploaderModule} from 'ngx-uploader';
import { TokenInterceptor } from './auth/token.interceptor';
import { StatusBarComponent } from './poi-edit/status-bar/status-bar.component';
import { UploadStatusDialogComponent } from './poi-edit/upload-status-dialog/upload-status-dialog.component';
import { ErrorInterceptor } from './error-interceptor';
import { TranslatePipe } from './translations.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AgmCoreModule} from '@agm/core'

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker'

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
    UploadStatusDialogComponent,
    TranslatePipe,
    PageNotFoundComponent
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
    NgxUploaderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBOYYsPrpWTunxjOVUoUwl1aJc9rBpzLWA'
    }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxMaterialTimepickerModule.forRoot()
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    TranslatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [UploadStatusDialogComponent]
})
export class AppModule {
}
