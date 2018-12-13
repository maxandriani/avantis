import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemGridComponent } from './components/item-grid/item-grid.component';
import { ItemRoutingModule } from './item-routing.module';
import { ItemGridPageComponent } from './pages/item-grid-page/item-grid-page.component';
import { NovoItemPageComponent } from './pages/novo-item-page/novo-item-page.component';
import { InterfaceModule } from '../common/interface/interface.module';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import { ItemUnidadePipe } from './pipes/item-unidade.pipe';
import { ItemGridFilterComponent } from './components/item-grid-filter/item-grid-filter.component';

@NgModule({
  imports: [
    CommonModule,
    ItemRoutingModule,
    InterfaceModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule
  ],
  declarations: [
    ItemGridPageComponent,
    NovoItemPageComponent,
    ItemUnidadePipe,
    ItemGridComponent,
    ItemGridFilterComponent
  ]
})
export class ItemModule { }
