import { TestBed } from '@angular/core/testing';

import { ItemFilterService } from './item-filter.service';

describe('ItemFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemFilterService = TestBed.get(ItemFilterService);
    expect(service).toBeTruthy();
  });
});
