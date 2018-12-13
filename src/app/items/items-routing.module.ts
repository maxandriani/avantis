import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsPageComponent } from './pages/items-page/items-page.component';
import { NovoItemPageComponent } from './pages/novo-item-page/novo-item-page.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsPageComponent
  },
  {
    path: 'novo',
    component: NovoItemPageComponent
  },
  {
    path: 'novo/:itemId',
    component: NovoItemPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
