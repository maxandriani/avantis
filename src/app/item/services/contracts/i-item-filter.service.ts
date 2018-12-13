import { ItemFilterService } from '../item-filter.service';
import { Observable } from 'rxjs';

export interface IItemFilterService {
  getFilters(): Object;
  set(key: string, value: any): ItemFilterService;
  next(): void;
  clear(): void;
  asObservable(): Observable<{}>;
}
