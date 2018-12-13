import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnDestroy {

  constructor() { }

  protected stream$ = new BehaviorSubject<boolean>(true);

  toogle(): void {
    this.stream$.next( ! this.stream$.value );
  }

  get value() {
    return this.stream$.value;
  }

  asObservable(): Observable<boolean> {
    return this.stream$.asObservable();
  }

  ngOnDestroy() {
    this.stream$.unsubscribe();
  }
}
