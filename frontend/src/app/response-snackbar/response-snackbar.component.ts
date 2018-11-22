import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-response-snackbar',
  templateUrl: './response-snackbar.component.html',
  styleUrls: ['./response-snackbar.component.css']
})
export class ResponseSnackbarComponent implements OnInit {

  @Input() Message;


  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
