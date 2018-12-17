import { ItemUnidadePipe } from './item-unidade.pipe';
import { TestBed } from '@angular/core/testing';
import { DisplayItemUnidadeService } from '../services/display-item-unidade.service';

describe('ItemUnidadePipe', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('create an instance', () => {
    const pipe = new ItemUnidadePipe(TestBed.get(DisplayItemUnidadeService));
    expect(pipe).toBeTruthy();
  });
});
