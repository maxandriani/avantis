import { Injectable, OnDestroy } from '@angular/core';
import { IMenuItem } from '../interfaces/i-menu-item';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnDestroy {

  constructor() { }

  protected menu$ = new BehaviorSubject<IMenuItem[]>([]);

  ngOnDestroy() {
    this.menu$.unsubscribe();
  }

  push(items: IMenuItem[]) {
    const menu = this.deepConcat(items, this.menu$.value);
    this.menu$.next(menu);
  }

  asObservable(): Observable<IMenuItem[]> {
    return this.menu$.asObservable();
  }

  protected deepConcat(items: IMenuItem[], parent: IMenuItem[]): IMenuItem[] {
    for (const item of items) {
      const menuIdx = parent.filter(it => it.route === item.route);
      if (menuIdx.length === 0) {
        parent.push(item);
      } else if (item.children && item.children.length > 0) {
        // Pointer magic >)
        menuIdx[0].children = this.deepConcat(item.children, menuIdx[0].children);
      }
    }

    return parent;
  }
}
