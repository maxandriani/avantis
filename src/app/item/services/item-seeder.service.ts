import { Injectable } from '@angular/core';
import { ItemService } from './item.service';
import { plainToClass } from 'class-transformer';
import { ItemEntity } from '../entities/item.entity';
import { ItemUnidadeEnum } from '../enums/item-unidade.enum';

const BASE: Partial<ItemEntity>[] = [
  {
    nome: 'Leite UHT Integral',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Leite UHT Desnatado',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 122,
    preco: 5.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (385 * 24 * 60 * 1000) )
  },
  {
    nome: 'Caneta BIC Preta',
    unidade: ItemUnidadeEnum.Unity,
    quantidade: 5,
    preco: 0.49,
    isPerecivel: false,
    fabricacao: new Date( Date.now() - (325 * 24 * 60 * 1000) )
  },
  {
    nome: 'Caneta BIC Azul',
    unidade: ItemUnidadeEnum.Unity,
    quantidade: 56985,
    preco: 0.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (465 * 24 * 60 * 1000) )
  },
  {
    nome: 'Caneta BIC Azul',
    unidade: ItemUnidadeEnum.Unity,
    quantidade: 1,
    preco: 1.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Mandioca',
    unidade: ItemUnidadeEnum.Kilogram,
    quantidade: 152.456,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (345 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Milho',
    unidade: ItemUnidadeEnum.Kilogram,
    quantidade: 564.456,
    preco: 5.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (963 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Tapioca',
    unidade: ItemUnidadeEnum.Kilogram,
    quantidade: 456.233,
    preco: 7.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Arroz',
    unidade: ItemUnidadeEnum.Kilogram,
    quantidade: 145.425,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Feijão',
    unidade: ItemUnidadeEnum.Kilogram,
    quantidade: 45.34,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Soja',
    unidade: ItemUnidadeEnum.Kilogram,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Rosca',
    unidade: ItemUnidadeEnum.Kilogram,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Centeio',
    unidade: ItemUnidadeEnum.Kilogram,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Linhaça',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Farinha de Batata',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Coca-Cola',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 1.344,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de maçã',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 123,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Pera',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 134.33,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Acerola',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 12.33,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Uva',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 145.32,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Pêssego',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 1.443,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Jaca',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 190.23,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Mamona',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 56.3,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Melancia',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 45.2,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Moranga',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 4455.2,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Carambola',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 45.2,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Ameixa',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 341.34,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Abacate',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 112.3,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Jabuticaba',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Suco de Soja',
    unidade: ItemUnidadeEnum.Liter,
    quantidade: 1,
    preco: 3.49,
    isPerecivel: true,
    validade: new Date(),
    fabricacao: new Date( Date.now() - (365 * 24 * 60 * 1000) )
  },
  {
    nome: 'Salmão',
    unidade: ItemUnidadeEnum.Kilogram,
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
