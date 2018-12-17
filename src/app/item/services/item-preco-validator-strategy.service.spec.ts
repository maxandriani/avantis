import { TestBed } from '@angular/core/testing';

import { ItemPrecoValidatorStrategyService } from './item-preco-validator-strategy.service';

describe('ItemPrecoValidatorStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemPrecoValidatorStrategyService = TestBed.get(ItemPrecoValidatorStrategyService);
    expect(service).toBeTruthy();
  });
});
