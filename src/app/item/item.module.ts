import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemGridPageComponent } from './pages/item-grid-page/item-grid-page.component';
import { NovoItemPageComponent } from './pages/novo-item-page/novo-item-page.component';
import { InterfaceModule } from '../common/interface/interface.module';
import { ItemGridComponent } from './components/item-grid/item-grid.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ItemRoutingModule,
    InterfaceModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [ItemGridPageComponent, NovoItemPageComponent, ItemGridComponent]
})
export class ItemModule { }
