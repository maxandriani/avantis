import { Injectable, EventEmitter } from '@angular/core';
import { ItemEntity } from '../entities/item.entity';
import { AvlTree } from 'src/app/common/core/structs/avl-tree';
import { IllegalOperationError } from 'src/app/common/core/errors/illegal-operation.error';
import { classToClass, plainToClass } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { IItemService } from './contracts/i-item.service';
import { ItemFilterEntity } from '../entities/item-filter.entity';
import { LATIN_SPECIAL_CHARS } from 'src/app/common/core/consts/latin-special-chars.const';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements IItemService {

  static readonly ItemAutoIncrementKey = 'itenAutoIncrementIdx';
  static readonly ItemStorageKey = 'itens';

  constructor(
  ) {
    const itemsString = localStorage.getItem(ItemService.ItemStorageKey) || '[]';
    const items = JSON.parse(itemsString);
    items.map(item => {
      item.value = plainToClass(ItemEntity, item.value);
      return item;
    });
    this.itemVault.batch(items);
  }

  protected itemVault = new AvlTree<number, ItemEntity>();
  protected stream$ = new EventEmitter<void>();

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

  asObservable(): Observable<void> {
    return this.stream$.asObservable();
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
    this.stream$.next(); // Tell every one else that data is changed
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
    this.stream$.next();
  }

  find(filters: ItemFilterEntity, take = 10, skip = 0, order?: Object): Observable<ItemEntity[]> {
    return of(this.computeList())
      .pipe(
        map(r => this.computeFilter(filters, r)),
        map(r => this.computeSort(order, r))
      );
  }

  all(take = 10, skip = 0, order?: Object): Observable<ItemEntity[]> {
    return this.find(undefined, take, skip, order);
  }

  async count(filters: any): Promise<number> {
    return this.find(filters)
               .pipe(
                 first(),
                 map(r => r.length)
                )
               .toPromise();
  }

  async get(id: number): Promise<ItemEntity> {
    return classToClass(this.itemVault.find(id));
  }

  protected computeFilter(filter: ItemFilterEntity, items: ItemEntity[]): ItemEntity[] {
    let likeReg = /(.*)/gi;

    if (filter === undefined) {
      return items;
    }

    if (!this.isNullOrUndefined(filter.nome)) {
      let search = filter.nome;
      // Removendo os acentos....
      search = this.clearSpecialChars(search);
      likeReg = new RegExp(`(${search.replace(/\s/g, '*')})`, 'gi');
    }

    return items.filter(item => {
      let select = true;

      if (select && !this.isNullOrUndefined(filter.isPerecivel)) {
        select = (filter.isPerecivel === item.isPerecivel);
      }

      if (select && !this.isNullOrUndefined(filter.fabricacao)) {
        const [start, finish] = this.getTimeRange(filter.fabricacao);
        select = (!this.isNullOrUndefined(item.fabricacao) && item.fabricacao.getTime() >= start && item.fabricacao.getTime() <= finish);
      }

      if (select && !this.isNullOrUndefined(filter.validade)) {
        const [start, finish] = this.getTimeRange(filter.validade);
        select = (!this.isNullOrUndefined(item.validade) && item.validade.getTime() >= start && item.validade.getTime() <= finish);
      }

      if (select && !this.isNullOrUndefined(filter.nome)) {
        select = likeReg.test(this.clearSpecialChars(item.nome));
        likeReg.lastIndex = 0;
      }

      return select;
    });
  }

  protected computeSort(order: Object, items: ItemEntity[]): ItemEntity[] {
    if (order === undefined) {
      return items;
    }

    return items.sort((left, right) => {
      /** Realiza ordenação multi dimencional */
      for (const [key, sort] of Object.values(order)) {
        if (left.hasOwnProperty(key)) {
          /** Se a chave primaria for igual, então ordena o próximo nível */
          if (left[key] === right[key]) {
            continue;
          }
          return (left[key] < right[key]) ? -1 : 1 * ((sort.toLowerCase() === 'asc') ? -1 : 1);
        }
      }
      return 0;
    });
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

  protected isNullOrUndefined(value: any): boolean {
    return (value === undefined || value === null || value === '');
  }

  protected clearSpecialChars(value: string): string {
    for (const [char, regex] of Object.entries(LATIN_SPECIAL_CHARS)) {
      value = value.replace(regex, char);
    }
    return value;
  }

  protected getTimeRange(time: Date): number[] {
    const dates: number[] = [];
    const clone = new Date(time);

    clone.setHours(0);
    clone.setMinutes(0);
    clone.setSeconds(0);
    clone.setMilliseconds(0);

    dates.push(clone.getTime());

    clone.setHours(23);
    clone.setMinutes(59);
    clone.setSeconds(59);
    clone.setMilliseconds(9999);

    dates.push(clone.getTime());

    return dates;
  }
}
