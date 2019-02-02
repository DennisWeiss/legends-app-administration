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
import {SnackbarService} from '../services/snackbar.service';


/**
 * Intercepts all responses. If there is an error-response,
 * error is displayed in a snackbar showing message and statuscode
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBarService: SnackbarService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {

        const message = `Error ${err.status}: ${err.error.message || err.message}`
        this.snackBarService.openSnackBar(message, 'OK');
      }
    }));
  }

}
