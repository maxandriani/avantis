import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ItemDsService } from '../../services/item-ds.service';
import { ItemService } from '../../services/item.service';
import { ItemFilterService } from '../../services/item-filter.service';
import { ItemEntity } from '../../entities/item.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'av-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss'],
})
export class ItemGridComponent implements OnInit {

  constructor(
    protected $itens: ItemService,
    protected $filters: ItemFilterService,
    protected $router: Router
  ) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ItemDsService;

  @Input() columns = ['id', 'nome', 'quantidade', 'preco', 'isPerecivel', 'validade', 'fabricacao', 'actions'];

  ngOnInit() {
    this.dataSource = new ItemDsService(this.paginator, this.sort, this.$itens, this.$filters);
  }

  async doEdit(item: ItemEntity): Promise<void> {
    this.$router.navigate([`/items/${item.id}`]);
  }

  async doRemove(item: ItemEntity): Promise<void> {
    this.$itens.remove(item);
  }
}
