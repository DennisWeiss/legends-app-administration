import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";


@Injectable()
export class SnackbarService {

constructor(private snackBar: MatSnackBar) {}

openSnackBar(message: string, action: string): void {

  this.snackBar.open(message, action, {
    duration: 5000,
  });
};
}
