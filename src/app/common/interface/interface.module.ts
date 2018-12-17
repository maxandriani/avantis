import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PageComponent } from './page/page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    PageComponent,
    DialogErrorComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    PageComponent,
    DialogErrorComponent
  ],
  entryComponents: [
    DialogErrorComponent
  ]
})
export class InterfaceModule { }
