import { TestBed } from '@angular/core/testing';

import { ItemSeederService } from './item-seeder.service';

describe('ItemSeederService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemSeederService = TestBed.get(ItemSeederService);
    expect(service).toBeTruthy();
  });
});
