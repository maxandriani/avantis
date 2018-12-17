import { TestBed } from '@angular/core/testing';

import { ItemFabricacaoValidatorStrategyService } from './item-fabricacao-validator-strategy.service';

describe('ItemFabricacaoValidatorStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemFabricacaoValidatorStrategyService = TestBed.get(ItemFabricacaoValidatorStrategyService);
    expect(service).toBeTruthy();
  });
});
