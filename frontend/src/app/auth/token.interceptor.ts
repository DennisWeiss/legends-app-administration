import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';



/**
 * Append token to Header saved in localStorage to every request.
 */

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    const token = localStorage.getItem('token') || '';

    const authRequest = req.clone({
      headers: req.headers.set('authorization', token)
    });

    return next.handle(authRequest);
  }

}
