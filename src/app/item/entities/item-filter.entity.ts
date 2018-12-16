import { Type } from 'class-transformer';

export class ItemFilterEntity {
  [key: string]: any;
  nome: string;
  isPerecivel: boolean;
  @Type(() => Date) validade: Date;
  @Type(() => Date) fabricacao: Date;
}
