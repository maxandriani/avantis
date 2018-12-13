import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IItemFilterService } from './contracts/i-item-filter.service';

@Injectable({
  providedIn: 'root'
})
export class ItemFilterService implements IItemFilterService {

  constructor() { }

  protected filters = {};
  protected $stream: BehaviorSubject<{}> = new BehaviorSubject<{}>(this.filters);

  getFilters(): Object {
    return this.filters;
  }

  set(key: string, value: any): ItemFilterService {
    this.filters[key] = value;
    return this;
  }

  next(): void {
    this.$stream.next(this.filters);
  }

  clear(): void {
    this.filters = {};
    this.next();
  }

  asObservable(): Observable<{}> {
    return this.$stream.asObservable();
  }
}
