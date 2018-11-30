import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean>  {

    if (this.authService.authState) {
      return true
    }

    return new Promise((resolve, reject) => {
      this.authService.verify().pipe(take(1)).subscribe(
        userData => {resolve(true)},
        err => {this.router.navigate(['/login']);
                resolve(false)});
    })
  }
}
