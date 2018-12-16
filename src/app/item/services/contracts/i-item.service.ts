import { ItemEntity } from '../../entities/item.entity';
import { Observable } from 'rxjs';
import { ItemFilterEntity } from '../../entities/item-filter.entity';

export interface IItemService {
  save(entity: ItemEntity): Promise<ItemEntity>;
  remove(entity: ItemEntity): Promise<void>;
  find(filters: ItemFilterEntity, take?: number, skip?: number, order?: Object): Observable<ItemEntity[]>;
  get(id: number): Promise<ItemEntity>;
  all(take?: number, skip?: number, order?: Object): Observable<ItemEntity[]>;
  count(filters?: any): Promise<number>;
  asObservable(): Observable<void>;
}
