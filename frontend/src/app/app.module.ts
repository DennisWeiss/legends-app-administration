import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PoiOverviewComponent } from './poi-overview/poi-overview.component'
import {HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component'
import {FlexLayoutModule} from '@angular/flex-layout';
import { TagComponent } from './tag/tag.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { PoiFilterComponent } from './poi-filter/poi-filter.component';



@NgModule({
  declarations: [
    AppComponent,
    PoiOverviewComponent,
    SignupComponent,
    LoginComponent,
    SidenavComponent,
    HeaderComponent,
    TagComponent,
    PoiFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FontAwesomeModule
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
