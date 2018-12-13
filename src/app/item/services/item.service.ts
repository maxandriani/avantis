import { Injectable } from '@angular/core';
import { ItemEntity } from '../entities/item.entity';
import { AvlTree } from 'src/app/common/core/structs/avl-tree';
import { IllegalOperationError } from 'src/app/common/core/errors/illegal-operation.error';
import { classToClass } from 'class-transformer';
import { IItemService } from './contracts/i-item-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements IItemService {

  static readonly ItemAutoIncrementKey = 'itenAutoIncrementIdx';
  static readonly ItemStorageKey = 'itens';

  constructor() {
    const itemsString = localStorage.getItem(ItemService.ItemStorageKey) || '[]';
    this.itemVault.batch(JSON.parse(itemsString));
  }

  protected itemVault = new AvlTree<number, ItemEntity>();

  protected incrementId(): number {
    let id = parseInt(localStorage.getItem(ItemService.ItemAutoIncrementKey), 10) || 1;
    id++;
    localStorage.setItem(ItemService.ItemAutoIncrementKey, id.toString());
    return id;
  }

  protected businessValidations(entity: ItemEntity) {}

  protected persistVault() {
    localStorage.setItem(ItemService.ItemStorageKey, JSON.stringify( this.itemVault.serialize() ) );
  }

  async save(entity: ItemEntity): Promise<ItemEntity> {
    if (entity.id) {
      // Update
      const item = this.itemVault.find(entity.id);
      if (!item) {
        throw new IllegalOperationError(`Não foi possível encontrar com item com o id ${entity.id}`);
      }
      Object.assign(item, entity);
      this.businessValidations(item);
      this.itemVault.update(item.id, classToClass(item)); // ClassToClass = Deep Clone
    } else {
      // Create
      this.businessValidations(entity);
      entity.id = this.incrementId();
      this.itemVault.push(entity.id, classToClass(entity)); // ClassToClass = Deep Clone
    }

    this.persistVault();

    return entity;
  }

  async remove(entity: ItemEntity): Promise<void> {
    if (!entity.id) {
      throw new IllegalOperationError('Você não pode remover um item sem identificação');
    }

    const item = this.itemVault.find(entity.id);

    if (!item) {
      throw new IllegalOperationError('Item não encontrato');
    }

    this.itemVault.remove(item.id);
    this.persistVault();
  }

  find(filters: any, take = 10, skip = 0, order?: string[]): Observable<ItemEntity[]> {
    return of(this.computeList())
      .pipe(
        map(r => this.computeFilter(filters, r)),
        map(r => this.computeSort(order, r))
      );
  }

  async get(id: number): Promise<ItemEntity> {
    return classToClass(this.itemVault.find(id));
  }

  protected computeFilter(filter, items: ItemEntity[]): ItemEntity[] {
    return items;
  }

  protected computeSort(order: string[], items: ItemEntity[]): ItemEntity[] {
    return items;
  }

  protected computeList() {
    const r: ItemEntity[] = [];
    /**
     * EU SEI QUE CONVERTER A ÁRVORE INTEIRA PRA ARRAY NÃO É PERFORMÁTICO....
     * Mas no mundo real essas operações são feitas em um banco de dados e não em local storage
     */
    let item = this.itemVault.next();
    while (!item.done) {
      r.push(classToClass(item.value.value)); // ClassToClass = Deep Clone
      item = this.itemVault.next();
    }
    return r;
  }
}
