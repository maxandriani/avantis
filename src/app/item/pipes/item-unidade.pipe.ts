import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { ItemUnidadeEnum } from '../enums/item-unidade.enum';
import { DisplayItemUnidadeService } from '../services/display-item-unidade.service';
import { IDisplayItemUnidade } from '../interfaces/i-display-item-unidade.interface';

@Pipe({
  name: 'itemUnidade'
})
export class ItemUnidadePipe implements PipeTransform {

  constructor(
    protected $itemUnidade: DisplayItemUnidadeService
  ) {}

  protected unidades: IDisplayItemUnidade[] = [];
  protected cache: { [key: string]: string } = {};

  async transform(value: number, unit?: ItemUnidadeEnum): Promise<string> {
    let s = '';

    switch (unit) {
      case ItemUnidadeEnum.Kilogram:
      case ItemUnidadeEnum.Liter:
        s = value.toFixed(3);
        break;
      case ItemUnidadeEnum.Unity:
        s = value.toFixed(0);
        break;
    }

    s += ` ${await this.resolveUnit(unit)}`;

    return s;
  }

  protected async resolveUnit(unit: ItemUnidadeEnum): Promise<string> {
    if (!this.cache[unit.toString()]) {
      this.cache[unit.toString()] = await this.$itemUnidade
                                   .getAbbr(unit);
    }

    return this.cache[unit.toString()];
  }

}
