import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {PoiOverviewComponent} from './poi-overview/poi-overview.component'
import { PoiEditComponent } from './poi-edit/poi-edit.component';

const routes: Routes = [
  {path: '', component: PoiOverviewComponent},
  {path: 'edit/:id', component: PoiEditComponent},
  {path: 'new', component: PoiEditComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
