import { TestBed } from '@angular/core/testing';

import { ItemQuantidadeValidatorStrategyService } from './item-quantidade-validator-strategy.service';

describe('ItemQuantidadeValidatorStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemQuantidadeValidatorStrategyService = TestBed.get(ItemQuantidadeValidatorStrategyService);
    expect(service).toBeTruthy();
  });
});
