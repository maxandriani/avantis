import { NgModule } from '@angular/core';
import {
  MAT_DATE_LOCALE,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatCommonModule,
  MatSnackBarModule,
  MatDialogModule,
  MatExpansionModule
} from '@angular/material';

@NgModule({
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  exports: [
    MatCommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule
  ],
  declarations: []
})
export class MaterialModule { }
