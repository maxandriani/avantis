import { ItemEntity } from '../../entities/item.entity';
import { Observable } from 'rxjs';

export interface IItemService {
  save(entity: ItemEntity): Promise<ItemEntity>;
  remove(entity: ItemEntity): Promise<void>;
  find(filters: any, take?: number, skip?: number, order?: string[]): Observable<ItemEntity[]>;
  get(id: number): Promise<ItemEntity>;
}
