import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Subscription } from 'rxjs';
import { IMenuItem } from '../interfaces/i-menu-item';
import { MatSidenav } from '@angular/material';
import { SidebarService } from '../services/sidebar.service';
import { ResolutionService } from '../services/resolution.service';

@Component({
  selector: 'av-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  constructor(
    protected $menu: MenuService,
  ) { }

  // Avoid trigger after destroy error
  protected subscriptions: Subscription[] = [];

  menu: IMenuItem[] = [];

  @ViewChild(MatSidenav) sidebarComponent: MatSidenav;

  ngOnInit() {
    this.subscriptions
        .push(
          this.$menu
              .asObservable()
              .subscribe(m => this.menu = m),
        );
  }

  ngOnDestroy() {
    this.subscriptions
        .map(s => s.unsubscribe());
  }

}
