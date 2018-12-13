import { ItemUnitEnum } from '../enums/item-unidade.enum';
import { Type } from 'class-transformer';

export class ItemEntity {
  id: number;
  nome: string; // Nome do item, Texto
  unidade: ItemUnitEnum; // Unidade de medida, Enumeração
  quantidade: number; // Quantidade, Numérico
  preco: number; // Preço, Monetário
  isPerecivel: boolean; // Produto perecível
  @Type(() => Date) validade: Date; // Data de validade, Data
  @Type(() => Date) fabricacao: Date; // Data de fabricação, Data
}
