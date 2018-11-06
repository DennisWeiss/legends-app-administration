import { NgModule } from "@angular/core";
import {
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatChipsModule
} from "@angular/material";


@NgModule({
  exports: [
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule
  ]
})
export class MaterialModule {}
