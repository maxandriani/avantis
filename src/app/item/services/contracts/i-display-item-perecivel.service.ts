import { Observable } from 'rxjs';
import { IDisplayItemPerecivel } from '../../interfaces/i-display-item-perecvel.interface';

export interface IDisplayItemPerecivelService {
  getAll(): Observable<IDisplayItemPerecivel[]>;
  getName(isPerecivel: boolean): Promise<string>;
}
