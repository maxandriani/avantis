import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IItemFilterService } from './contracts/i-item-filter.service';
import { ItemFilterEntity } from '../entities/item-filter.entity';

@Injectable({
  providedIn: 'root'
})
export class ItemFilterService implements IItemFilterService {

  constructor() { }

  protected filters: ItemFilterEntity = new ItemFilterEntity;
  protected $stream: BehaviorSubject<{}> = new BehaviorSubject<{}>(this.filters);

  getFilters(): ItemFilterEntity {
    return this.filters;
  }

  patch(values: Partial<ItemFilterEntity>): ItemFilterService {
    for (const key of Object.keys(values)) {
      this.filters[key] = values[key];
    }
    return this;
  }

  set(filter: ItemFilterEntity): ItemFilterService {
    this.filters = filter;
    return this;
  }

  next(): void {
    this.$stream.next(this.filters);
  }

  clear(): void {
    this.filters = new ItemFilterEntity;
    this.next();
  }

  asObservable(): Observable<{}> {
    return this.$stream.asObservable();
  }
}
