import { Injectable } from '@angular/core';
import { IDisplayItemPerecivel } from '../interfaces/i-display-item-perecvel.interface';
import { IDisplayItemPerecivelService } from './contracts/i-display-item-perecivel.service';
import { Observable, of } from 'rxjs';

const DATA: IDisplayItemPerecivel[] = [
  { id: true, name: 'Perecível' },
  { id: false, name: 'Não perecível' }
];

@Injectable({
  providedIn: 'root'
})
export class DisplayItemPerecivelService implements IDisplayItemPerecivelService {

  constructor() { }

  getAll(): Observable<IDisplayItemPerecivel[]> {
    return of(this.clone(DATA));
  }

  async getName(isPerecivel: boolean): Promise<string> {
    const item = DATA.filter(i => i.id === isPerecivel);
    return (item.length === 1)
            ? item[0].name
            : '';
  }

  protected clone(data: IDisplayItemPerecivel[]): IDisplayItemPerecivel[] {
    return data.map(i => Object.assign({}, i));
  }
}
