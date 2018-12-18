import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {PoiOverviewComponent} from './poi-overview/poi-overview.component'
import { PoiEditComponent } from './poi-edit/poi-edit.component';
import { PoiContentComponent } from './poi-edit/poi-content/poi-content.component';
import { AuthGuard } from './auth/auth.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';

const routes: Routes = [
  {path: 'edit/content/:id', component: PoiContentComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'edit/:id', component: PoiEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'new', component: PoiEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path: 'poi-list', component: PoiOverviewComponent, canActivate: [AuthGuard]},
  {path: 'user-managment', component: UserManagmentComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'poi-list', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
