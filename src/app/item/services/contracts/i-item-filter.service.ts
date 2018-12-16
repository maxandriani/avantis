import { ItemFilterService } from '../item-filter.service';
import { Observable } from 'rxjs';
import { ItemFilterEntity } from '../../entities/item-filter.entity';

export interface IItemFilterService {
  getFilters(): ItemFilterEntity;
  patch(values: Partial<ItemFilterEntity>): ItemFilterService;
  set(values: ItemFilterEntity): ItemFilterService;
  next(): void;
  clear(): void;
  asObservable(): Observable<{}>;
}
