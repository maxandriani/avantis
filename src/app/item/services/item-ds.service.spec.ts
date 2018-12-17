import { TestBed } from '@angular/core/testing';

import { ItemDsService } from './item-ds.service';
import { MatPaginatorModule } from '@angular/material';

describe('ItemDsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
    ]
  }));

  it('should be created', () => {
    const service: ItemDsService = TestBed.get(ItemDsService);
    expect(service).toBeTruthy();
  });
});
