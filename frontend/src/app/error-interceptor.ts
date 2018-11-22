import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        const message = `Error ${err.status}: ${err.error.message}`
        this.openSnackBar(message, 'OK');
      }
    }));
  }

  openSnackBar(message: string, action: string) {

    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
