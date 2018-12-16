import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemFilterService } from '../../services/item-filter.service';
import { Subscription } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { ItemFilterEntity } from '../../entities/item-filter.entity';

@Component({
  selector: 'av-item-grid-filter',
  templateUrl: './item-grid-filter.component.html',
  styleUrls: ['./item-grid-filter.component.scss']
})
export class ItemGridFilterComponent implements OnInit, OnDestroy {

  constructor(
    protected $filter: ItemFilterService,
    protected $fb: FormBuilder
  ) { }

  protected subscriptions: Subscription[] = [];

  filters = this.$fb
                .group({
                  nome: undefined,
                  isPerecivel: undefined,
                  validade: undefined,
                  fabricacao: undefined
                });

  ngOnInit() {
    this.filters.patchValue(this.$filter.getFilters());

    this.subscriptions
        .push(
          this.filters
              .valueChanges
              .subscribe(values => this.$filter
                                       .patch(this.parseValues(values))
                                       .next())
        );
  }

  ngOnDestroy() {
    this.subscriptions
        .map(s => s.unsubscribe());
  }

  protected parseValues(values: any): ItemFilterEntity {
    values.isPerecivel = (values.isPerecivel === '1')
                          ? true
                          : (values.isPerecivel === '0')
                            ? false
                            : null;

    return plainToClass<ItemFilterEntity, Object>(ItemFilterEntity, values);
  }

}
