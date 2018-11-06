import { NgModule } from "@angular/core";
import { MatCheckboxModule, MatTableModule, MatPaginatorModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListItem, MatListModule, MatButtonModule } from "@angular/material";


@NgModule({
  exports: [
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
