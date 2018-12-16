import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemGridPageComponent } from './pages/item-grid-page/item-grid-page.component';
import { NovoItemPageComponent } from './pages/novo-item-page/novo-item-page.component';

const routes: Routes = [
  {
    path: '',
    component: ItemGridPageComponent
  },
  {
    path: 'novo',
    component: NovoItemPageComponent
  },
  {
    path: ':itemId',
    component: NovoItemPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
