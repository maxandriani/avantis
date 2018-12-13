import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ItemDsService } from '../../services/item-ds.service';
import { ItemService } from '../../services/item.service';
import { ItemFilterService } from '../../services/item-filter.service';
import { ItemEntity } from '../../entities/item.entity';

@Component({
  selector: 'av-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss'],
})
export class ItemGridComponent implements OnInit {

  constructor(
    protected $itens: ItemService
  ) {
  }

  protected $filters = new ItemFilterService();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ItemDsService;

  @Input() columns = ['id', 'nome', 'quantidade', 'preco', 'isPerecivel', 'validade', 'fabricacao', 'actions'];

  ngOnInit() {
    this.dataSource = new ItemDsService(this.paginator, this.sort, this.$itens, this.$filters);
  }

  async doEdit(item: ItemEntity): Promise<void> {

  }

  async doRemove(item: ItemEntity): Promise<void> {

  }
}
