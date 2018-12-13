import { Pipe, PipeTransform } from '@angular/core';
import { ItemUnitEnum } from '../enums/item-unidade.enum';

@Pipe({
  name: 'itemUnidade'
})
export class ItemUnidadePipe implements PipeTransform {

  transform(value: number, unit?: ItemUnitEnum): any {
    let s = '';

    switch (unit) {
      case ItemUnitEnum.Kilogram:
      case ItemUnitEnum.Liter:
        s = value.toFixed(3);
        break;
      case ItemUnitEnum.Unity:
        s = value.toFixed(0);
        break;
    }

    s += ' ' + this.getUnit(unit);

    return s;
  }

  getUnit(unit) {
    switch (unit) {
      case ItemUnitEnum.Kilogram:
        return 'kg';
      case ItemUnitEnum.Liter:
        return 'lt';
      case ItemUnitEnum.Unity:
        return 'un';
    }
  }

}
