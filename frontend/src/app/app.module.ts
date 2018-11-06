import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component';
import { PoiOverviewComponent } from './poi-overview/poi-overview.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatTableModule} from '@angular/material'
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    PoiOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule
  ],
  exports: [
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
