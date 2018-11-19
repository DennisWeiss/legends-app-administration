import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authToken = (this.authService.authState) ? localStorage.getItem('token') : '';
    console.log('authToken', authToken);
    const authRequest = req.clone({
      headers: req.headers.set('authorization', authToken)
    });

    return next.handle(authRequest);
  }

}
