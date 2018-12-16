import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { ItemEntity } from '../entities/item.entity';
import { MatPaginator, MatSort } from '@angular/material';
import { ItemService } from './item.service';
import { Observable, of, merge } from 'rxjs';
import { IItemDsService } from './contracts/i-item-ds.service';
import { flatMap, tap, first } from 'rxjs/operators';
import { ItemFilterEntity } from '../entities/item-filter.entity';
import { ItemFilterService } from './item-filter.service';

@Injectable({
  providedIn: 'root'
})
export class ItemDsService extends DataSource<ItemEntity> implements IItemDsService {

  constructor(
    protected $paginator: MatPaginator,
    protected $sort: MatSort,
    protected $itens: ItemService,
    protected $filter: ItemFilterService
  ) {
    super();
  }

  connect(): Observable<ItemEntity[]> {
    // Criando um super observable...
    const dataMutations = [
      this.$filter.asObservable(),
      this.$itens.asObservable(),
      this.$paginator.page,
      this.$sort.sortChange,
      of([])
    ];

    return merge(...dataMutations)
            .pipe(
              flatMap(() => this.doRequest())
            );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  protected doRequest(): Observable<ItemEntity[]> {
    return this.$itens
              .find(
                this.computeFilter(),
                this.computeTake(),
                this.computeSkip(),
                this.computeSort()
              )
              .pipe(
                tap(r => this.$paginator.length = r.length)
              );
  }

  protected computeFilter(): ItemFilterEntity {
    return this.$filter.getFilters();
  }

  protected computeTake(): number {
    return this.$paginator.pageSize;
  }

  protected computeSkip(): number {
    return (this.$paginator.pageIndex) * this.$paginator.pageSize;
  }

  protected computeSort(): object[] {
    let sort;
    if (this.$sort.active) {
      sort = {};
      sort[ this.$sort.active ] = this.$sort.direction;
    }
    return sort;
  }

}
