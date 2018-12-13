import { TestBed } from '@angular/core/testing';

import { ItemDsService } from './item-ds.service';

describe('ItemDsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemDsService = TestBed.get(ItemDsService);
    expect(service).toBeTruthy();
  });
});
