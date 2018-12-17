import { Observable } from 'rxjs';
import { IDisplayItemUnidade } from '../../interfaces/i-display-item-unidade.interface';
import { ItemUnidadeEnum } from '../../enums/item-unidade.enum';

export interface IDisplayItemUnidadeService {
  getAll(): Observable<IDisplayItemUnidade[]>;
  get(id: ItemUnidadeEnum): Promise<IDisplayItemUnidade>;
  getName(unidade: ItemUnidadeEnum): Promise<string>;
  getAbbr(unidade: ItemUnidadeEnum): Promise<string>;
}
