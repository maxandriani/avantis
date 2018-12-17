import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBreadcrumb } from '../interfaces/i-breadcrumb';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

const PAGE_LABEL_KEY = 'label';

@Component({
  selector: 'av-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  constructor(
    private $activatedRoute: ActivatedRoute,
    private $router: Router
  ) {
  }

  protected subscriptions: Subscription[] = [];

  breadcrumbs: IBreadcrumb[] = [];

  ngOnInit() {
    this.subscriptions
        .push(
          // Inscrevendo nos eventos de navegação
          this.$router
              .events
              .pipe(filter(e => e instanceof NavigationEnd))
              .subscribe(event => {
                const root: ActivatedRoute = this.$activatedRoute.root;
                this.breadcrumbs = this.resolveBreadcrumbs(root);
              })
        );
  }

  ngOnDestroy() {
    this.subscriptions
        .map(s => s.unsubscribe());
  }

  protected resolveBreadcrumbs(route: ActivatedRoute, url: string= '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    // Se não houver mais filhos, encerramos a busca
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      // Ignorando segmentos
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // Pulando rotas intermediárias
      if (!child.snapshot.data.hasOwnProperty(PAGE_LABEL_KEY)) {
        return this.resolveBreadcrumbs(child, url, breadcrumbs);
      }

      url += `/${child.snapshot.url.map(segment => segment.path).join('/')}`;
      breadcrumbs.push({
        label: child.snapshot.data[PAGE_LABEL_KEY],
        params: child.snapshot.params,
        url: url
      });

      // recursive
      return this.resolveBreadcrumbs(child, url, breadcrumbs);
    }

    // safe return
    return breadcrumbs;
  }

}
