import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PageComponent } from './page/page.component';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatExpansionModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    PageComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    PageComponent
  ]
})
export class InterfaceModule { }
