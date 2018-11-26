import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {promise} from "selenium-webdriver";
import Promise = promise.Promise;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return new Promise<boolean>((resolve, reject) => {
      if (this.authService.authState) {
        resolve(true)
      } else {
        this.authService.verify().subscribe(value => resolve(true), err => resolve(false))
      }
    })
  }
}
