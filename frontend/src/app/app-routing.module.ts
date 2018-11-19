import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {PoiOverviewComponent} from './poi-overview/poi-overview.component'
import { PoiEditComponent } from './poi-edit/poi-edit.component';
import { PoiContentComponent } from './poi-edit/poi-content/poi-content.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'edit/content/:id', component: PoiContentComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: PoiEditComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'new', component: PoiEditComponent, canActivate: [AuthGuard]},
  {path: '', component: PoiOverviewComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
