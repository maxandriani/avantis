import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as AvCommonModule } from '../common/common.module';
import { ItemGridComponent } from './components/item-grid/item-grid.component';
import { ItemRoutingModule } from './item-routing.module';
import { ItemGridPageComponent } from './pages/item-grid-page/item-grid-page.component';
import { NovoItemPageComponent } from './pages/novo-item-page/novo-item-page.component';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatInputModule,
  MatSlideToggleModule,
  MatDialogModule
} from '@angular/material';
import { ItemUnidadePipe } from './pipes/item-unidade.pipe';
import { ItemGridFilterComponent } from './components/item-grid-filter/item-grid-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemFormComponent } from './components/item-form/item-form.component';

@NgModule({
  imports: [
    CommonModule,
    ItemRoutingModule,
    AvCommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  declarations: [
    ItemGridPageComponent,
    NovoItemPageComponent,
    ItemUnidadePipe,
    ItemGridComponent,
    ItemGridFilterComponent,
    ItemFormComponent
  ]
})
export class ItemModule { }
