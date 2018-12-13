import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsPageComponent } from './pages/items-page/items-page.component';
import { NovoItemPageComponent } from './pages/novo-item-page/novo-item-page.component';
import { InterfaceModule } from '../common/interface/interface.module';

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    InterfaceModule
  ],
  declarations: [ItemsPageComponent, NovoItemPageComponent]
})
export class ItemsModule { }
