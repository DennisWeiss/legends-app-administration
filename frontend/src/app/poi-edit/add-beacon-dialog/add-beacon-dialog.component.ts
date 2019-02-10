import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-beacon-dialog',
  templateUrl: './add-beacon-dialog.component.html',
  styleUrls: ['./add-beacon-dialog.component.css']
})
export class AddBeaconDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddBeaconDialogComponent>
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
