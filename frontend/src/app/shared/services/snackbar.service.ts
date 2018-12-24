import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";


@Injectable({
  providedIn: 'root'
})

export default class SnackbarService {


constructor(public snackBar: MatSnackBar) {}

openSnackBar(message: string, action: string) {

  this.snackBar.open(message, action, {
    duration: 5000,
  });
}






}
