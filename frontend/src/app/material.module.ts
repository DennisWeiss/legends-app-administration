import { NgModule } from "@angular/core";
import {
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatChipsModule,
  MatButtonModule
} from "@angular/material";


@NgModule({
  exports: [
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
