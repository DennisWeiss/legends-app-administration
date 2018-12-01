import { NgModule } from "@angular/core";
import {
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatChipsModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatCardModule,
  MatSelectModule,
  MatDividerModule,
  MatTabsModule,
  MatExpansionModule,
  MatProgressBar,
  MatProgressBarModule,
  MatDialogModule,
  MatSnackBarModule
} from "@angular/material";

import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  exports: [
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    MatTabsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    DragDropModule

  ]
})
export class MaterialModule {}
