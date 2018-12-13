import { Component, OnInit } from '@angular/core';
import { IItemFilterService } from '../../services/contracts/i-item-filter.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'av-item-grid-filter',
  templateUrl: './item-grid-filter.component.html',
  styleUrls: ['./item-grid-filter.component.scss']
})
export class ItemGridFilterComponent implements OnInit {

  constructor(
    protected $filter: IItemFilterService
  ) { }

  nome = new FormControl();
  perecivel = new FormControl();
  validade = new FormControl();
  fabricacao = new FormControl();

  ngOnInit() {
  }

}
