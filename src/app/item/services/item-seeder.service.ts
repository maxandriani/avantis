import { Injectable } from '@angular/core';
import { ItemService } from './item.service';
import { plainToClass } from 'class-transformer';
import { ItemEntity } from '../entities/item.entity';
import { ItemUnitEnum } from '../enums/item-unidade.enum';

const BASE: Partial<ItemEntity>[] = [
  {
    nome: 'Leite UHT Integral',
    unidade: ItemUnitEnum.Liter,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Leite UHT Desnatado',
    unidade: ItemUnitEnum.Liter,
    quantidade: 122,
    preco: 5.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (385 * 24 * 60 * 1000) )
  },
  {
    nome: 'Caneta BIC Preta',
    unidade: ItemUnitEnum.Unity,
    quantidade: 5,
    preco: 0.49,
    isPerecivel: false,
    fabricacao: new Date( Date.now() - (325 * 24 * 60 * 1000) )
  },
  {
    nome: 'Caneta BIC Azul',
    unidade: ItemUnitEnum.Unity,
    quantidade: 56985,
    preco: 0.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (465 * 24 * 60 * 1000) )
  },
  {
    nome: 'Caneta BIC Azul',
    unidade: ItemUnitEnum.Unity,
    quantidade: 1,
    preco: 1.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Mandioca',
    unidade: ItemUnitEnum.Kilogram,
    quantidade: 152.456,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (345 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Milho',
    unidade: ItemUnitEnum.Kilogram,
    quantidade: 564.456,
    preco: 5.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (963 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Tapioca',
    unidade: ItemUnitEnum.Kilogram,
    quantidade: 456.233,
    preco: 7.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Arroz',
    unidade: ItemUnitEnum.Kilogram,
    quantidade: 145.425,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Feijão',
    unidade: ItemUnitEnum.Kilogram,
    quantidade: 45.34,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Soja',
    unidade: ItemUnitEnum.Kilogram,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Rosca',
    unidade: ItemUnitEnum.Kilogram,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Centeio',
    unidade: ItemUnitEnum.Kilogram,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Linhaça',
    unidade: ItemUnitEnum.Liter,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Batata',
    unidade: ItemUnitEnum.Liter,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Coca-Cola',
    unidade: ItemUnitEnum.Liter,
    quantidade: 1.344,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de maçã',
    unidade: ItemUnitEnum.Liter,
    quantidade: 123,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Pera',
    unidade: ItemUnitEnum.Liter,
    quantidade: 134.33,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Acerola',
    unidade: ItemUnitEnum.Liter,
    quantidade: 12.33,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Uva',
    unidade: ItemUnitEnum.Liter,
    quantidade: 145.32,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Pêssego',
    unidade: ItemUnitEnum.Liter,
    quantidade: 1.443,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Jaca',
    unidade: ItemUnitEnum.Liter,
    quantidade: 190.23,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Mamona',
    unidade: ItemUnitEnum.Liter,
    quantidade: 56.3,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Melancia',
    unidade: ItemUnitEnum.Liter,
    quantidade: 45.2,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Moranga',
    unidade: ItemUnitEnum.Liter,
    quantidade: 4455.2,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Carambola',
    unidade: ItemUnitEnum.Liter,
    quantidade: 45.2,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Ameixa',
    unidade: ItemUnitEnum.Liter,
    quantidade: 341.34,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Abacate',
    unidade: ItemUnitEnum.Liter,
    quantidade: 112.3,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Jabuticaba',
    unidade: ItemUnitEnum.Liter,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Soja',
    unidade: ItemUnitEnum.Liter,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Salmão',
    unidade: ItemUnitEnum.Kilogram,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  }
];

@Injectable({
  providedIn: 'root'
})
export class ItemSeederService {

  constructor(
    protected $itens: ItemService
  ) { }

  seed() {
    this.$itens
      .count(undefined)
      .then(c => {
        if (c === 0) {
          for (const i of BASE) {
            this.$itens.save(plainToClass(ItemEntity, i));
          }
        }
      });
  }
}
