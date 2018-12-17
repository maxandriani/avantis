import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemGridPageComponent } from './pages/item-grid-page/item-grid-page.component';
import { NovoItemPageComponent } from './pages/novo-item-page/novo-item-page.component';

const routes: Routes = [
  {
    path: '',
    component: ItemGridPageComponent,
    data: {
      label: 'Lista'
    }
  },
  {
    path: 'novo',
    component: NovoItemPageComponent,
    data: {
      label: 'Novo Item'
    }
  },
  {
    path: ':itemId',
    component: NovoItemPageComponent,
    data: {
      label: 'Item'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
