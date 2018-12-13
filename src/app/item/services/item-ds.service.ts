import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { ItemEntity } from '../entities/item.entity';
import { MatPaginator, MatSort } from '@angular/material';
import { ItemService } from './item.service';
import { Observable, of, merge } from 'rxjs';
import { IItemDsService } from './contracts/i-item-ds.service';
import { IItemFilterService } from './contracts/i-item-filter.service';
import { flatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemDsService extends DataSource<ItemEntity> implements IItemDsService {

  constructor(
    protected $paginator: MatPaginator,
    protected $sort: MatSort,
    protected $itens: ItemService,
    protected $filter: IItemFilterService
  ) {
    super();
  }

  connect(): Observable<ItemEntity[]> {
    // Criando um super observable...
    const dataMutations = [
      of([]),
      this.$itens.asObservable(),
      this.$paginator.page,
      this.$sort.sortChange,
      this.$filter.asObservable()
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

  protected computeFilter(): Object {
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
