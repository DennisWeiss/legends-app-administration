import { NgModule } from "@angular/core";
import { MatCheckboxModule, MatTableModule, MatPaginatorModule } from "@angular/material";


@NgModule({
  exports: [
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {}
