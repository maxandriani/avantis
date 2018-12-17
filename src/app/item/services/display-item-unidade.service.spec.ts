import { TestBed } from '@angular/core/testing';

import { DisplayItemUnidadeService } from './display-item-unidade.service';

describe('DisplayItemUnidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayItemUnidadeService = TestBed.get(DisplayItemUnidadeService);
    expect(service).toBeTruthy();
  });
});
