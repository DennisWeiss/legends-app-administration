import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PoiOverviewComponent } from './poi-overview/poi-overview.component'
import {HttpClientModule} from '@angular/common/http'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { TagComponent } from './tag/tag.component'


@NgModule({
  declarations: [
    AppComponent,
    PoiOverviewComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
