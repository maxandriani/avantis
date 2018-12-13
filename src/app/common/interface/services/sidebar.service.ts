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

  open(): void {
    this.stream$.next(true);
  }

  close(): void {
    this.stream$.next(false);
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
