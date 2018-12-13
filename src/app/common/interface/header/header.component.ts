import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'av-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    protected $sidebar: SidebarService
  ) { }

  protected subscriptions: Subscription[] = [];

  isOppened = false;

  @Input() title = '';

  ngOnInit() {
    this.subscriptions
        .push(
          this.$sidebar
              .asObservable()
              .subscribe(b => this.isOppened = b)
        );
  }

  ngOnDestroy() {
    this.subscriptions
        .map(s => s.unsubscribe());
  }

  toogle(): void {
    this.$sidebar.toogle();
  }

}
