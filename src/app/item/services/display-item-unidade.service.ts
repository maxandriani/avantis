import { Injectable } from '@angular/core';
import { IDisplayItemUnidadeService } from './contracts/i-display-item-unidade.service';
import { IDisplayItemUnidade } from '../interfaces/i-display-item-unidade.interface';
import { ItemUnidadeEnum } from '../enums/item-unidade.enum';
import { Observable, of } from 'rxjs';

const DATA: IDisplayItemUnidade[] = [
  { id: ItemUnidadeEnum.Kilogram, name: 'Quilograma', abbr: 'kg' },
  { id: ItemUnidadeEnum.Liter, name: 'Litro', abbr: 'Lt' },
  { id: ItemUnidadeEnum.Unity, name: 'Unidade', abbr: 'Un' }
];

@Injectable({
  providedIn: 'root'
})
export class DisplayItemUnidadeService implements IDisplayItemUnidadeService {

  constructor() { }

  getAll(): Observable<IDisplayItemUnidade[]> {
    return of(this.clone(DATA));
  }

  async get(id: ItemUnidadeEnum): Promise<IDisplayItemUnidade> {
    return this.getSync(id);
  }

  async getName(unidade: ItemUnidadeEnum): Promise<string> {
    const item = this.getSync(unidade);
    return (item)
            ? item.name
            : '';
  }

  async getAbbr(unidade: ItemUnidadeEnum): Promise<string> {
    const item = this.getSync(unidade);
    return (item)
            ? item.abbr
            : '';
  }

  protected getSync(id: ItemUnidadeEnum): IDisplayItemUnidade {
    const item = DATA.filter(i => i.id === id);
    return (item.length === 1)
            ? this.clone(item)[0]
            : null;
  }

  protected clone(data: IDisplayItemUnidade[]): IDisplayItemUnidade[] {
    return data.map(i => Object.assign({}, i));
  }
}
