import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';
import { AuthGroup } from './permission/authorization.types';
import {SnackbarService} from '../shared/services/snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
              private snackbarService: SnackbarService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {


    // user is already logged in
    if (this.authService.authState) {

      if (this.hasRequiredPermission(route.data['auth'])) {
        return true;
      } else { // access restricted
          this.router.navigate(['/']);
          this.snackbarService.openSnackBar('Not authorized to access page!', 'OK');
        return false;
      }
    }

    // user not logged in -> try to auto-login based on token
    return new Promise((resolve, reject) => {
      this.authService.verify().pipe(take(1)).subscribe(
        userData => {
          if (this.hasRequiredPermission(route.data['auth'])) {
            resolve(true);
          } else { // access restricted
              this.router.navigate(['/']);
              this.snackbarService.openSnackBar('Not authorized to access page!', 'OK');
            resolve(false);
          }
        },
        err => { // token deformed, expired, not existant, ... -> user needs to manually login
          this.router.navigate(['/login']);
          resolve(false)
        });
    })
  }

  protected hasRequiredPermission(authGroup: AuthGroup): boolean {
        if (authGroup) {
            return this.authService.hasPermission(authGroup);
        } else {
            return this.authService.hasPermission(null); } // no permissions required
        }
}
