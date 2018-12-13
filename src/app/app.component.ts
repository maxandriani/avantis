import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ResolutionService } from './common/interface/services/resolution.service';
import { MenuService } from './common/interface/services/menu.service';
import { Subscription } from 'rxjs';
import { SidebarService } from './common/interface/services/sidebar.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    protected $resolution: ResolutionService,
    protected $sidebar: SidebarService,
    protected $cdr: ChangeDetectorRef,
    protected $menu: MenuService /** @todo Mover para APP_INITIALIZER */
  ) {}

  protected subscriptions: Subscription[] = [];

  @ViewChild(MatSidenav) sidebarComponent: MatSidenav;

  title = 'Avantis Itens App';
  isMobile = this.$resolution.isMobile;

  ngOnInit() {
    this.subscriptions
        .push(
          this.$resolution
              .asObservable()
              .subscribe(state => this.isMobile = state.matches),
          this.$sidebar
              .asObservable()
              .subscribe(toogle => {
                if (this.sidebarComponent) {
                  if (toogle) {
                    this.sidebarComponent.open();
                  } else {
                    this.sidebarComponent.close();
                  }
                }
              }),
        );

    this.$menu
        .push([
          {
            label: 'Itens',
            route: ''
          },
          {
            label: 'Novo Item',
            route: 'novo'
          }
        ]);
  }

  ngOnDestroy() {
    this.subscriptions
        .map(s => s.unsubscribe());
  }

  ngAfterViewInit() {
    if (this.$sidebar.value) {
      this.sidebarComponent.open();
    } else {
      this.sidebarComponent.close();
    }
    this.$cdr.detectChanges();
  }

}
