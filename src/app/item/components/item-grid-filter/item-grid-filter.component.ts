import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemFilterService } from '../../services/item-filter.service';
import { Subscription } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { ItemFilterEntity } from '../../entities/item-filter.entity';
import { ResolutionService } from 'src/app/common/interface/services/resolution.service';
import { DisplayItemPerecivelService } from '../../services/display-item-perecivel.service';
import { IDisplayItemUnidade } from '../../interfaces/i-display-item-unidade.interface';
import { IDisplayItemPerecivel } from '../../interfaces/i-display-item-perecvel.interface';
import { DisplayItemUnidadeService } from '../../services/display-item-unidade.service';

@Component({
  selector: 'av-item-grid-filter',
  templateUrl: './item-grid-filter.component.html',
  styleUrls: ['./item-grid-filter.component.scss']
})
export class ItemGridFilterComponent implements OnInit, OnDestroy {

  constructor(
    protected $filter: ItemFilterService,
    protected $fb: FormBuilder,
    protected $itemUnidade: DisplayItemUnidadeService,
    protected $itemPerecivel: DisplayItemPerecivelService,
    protected $display: ResolutionService
  ) { }

  protected subscriptions: Subscription[] = [];

  filters = this.$fb
                .group({
                  nome: undefined,
                  isPerecivel: undefined,
                  validade: undefined,
                  fabricacao: undefined
                });
  isMobile = this.$display.isMobile;
  itemUnidades: IDisplayItemUnidade[] = [];
  itemPerecivel: IDisplayItemPerecivel[] = [];

  ngOnInit() {
    this.filters.patchValue(this.$filter.getFilters());

    this.subscriptions
        .push(
          this.filters
              .valueChanges
              .subscribe(values => this.$filter
                                       .patch(this.parseValues(values))
                                       .next()),
          this.$display
              .asObservable()
              .subscribe(b => this.isMobile = b.matches),
          this.$itemPerecivel
              .getAll()
              .subscribe(i => this.itemPerecivel = i),
          this.$itemUnidade
              .getAll()
              .subscribe(i => this.itemUnidades = i)
        );
  }

  ngOnDestroy() {
    this.subscriptions
        .map(s => s.unsubscribe());
  }

  onClear() {
    this.filters.reset();
  }

  protected parseValues(values: any): ItemFilterEntity {
    return plainToClass<ItemFilterEntity, Object>(ItemFilterEntity, values);
  }

}
