import { TestBed } from '@angular/core/testing';

import { DisplayItemPerecivelService } from './display-item-perecivel.service';

describe('DisplayItemPerecivelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayItemPerecivelService = TestBed.get(DisplayItemPerecivelService);
    expect(service).toBeTruthy();
  });
});
