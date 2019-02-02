import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpEventType, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-upload-status-dialog',
  templateUrl: './upload-status-dialog.component.html',
  styleUrls: ['./upload-status-dialog.component.css']
})

export class UploadStatusDialogComponent implements OnInit, OnDestroy {

  percentDone = 0;
  req;
  reqPending = false;
  error: HttpErrorResponse;

  reqSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<UploadStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router,
    private snackBarService: SnackbarService) {}

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.req = this.data.req;
    this.startRequest();
};

  startRequest() {
    this.error = null;
    this.reqPending = true;

    if (this.reqSub) { this.reqSub.unsubscribe(); }

    this.reqSub = this.req
    .pipe(map((event: HttpEvent<any>) => {
      // Via this API, you get access to the raw event stream.
      // Look for upload progress events.
      if (event.type === HttpEventType.UploadProgress) {
        // This is an upload progress event. Compute and show the % done:
        this.percentDone = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.reqPending = false;
        this.router.navigate(['']).then(() => {
          this.dialogRef.close();
          this.openSnackBar(event.body.message, 'OK');
        });
      }
    }),
    catchError((err, caught) => {
      this.error = err;
      return of(err);
    })
  ).subscribe(() => {});
  }

  cancelUpload() {
    this.reqSub.unsubscribe();
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBarService.openSnackBar(message, action);
  }

  ngOnDestroy() {
    if (this.reqSub) {
      this.reqSub.unsubscribe();
    }
  }

}
