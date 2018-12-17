import { TestBed } from '@angular/core/testing';

import { ItemValidadeValidatorStrategyService } from './item-validade-validator-strategy.service';

describe('ItemValidadeValidatorStrategyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemValidadeValidatorStrategyService = TestBed.get(ItemValidadeValidatorStrategyService);
    expect(service).toBeTruthy();
  });
});
