import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule, MatIconModule } from '@angular/material';

import { ItemGridComponent } from './item-grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemUnidadePipe } from '../../pipes/item-unidade.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('ItemGridComponent', () => {
  let component: ItemGridComponent;
  let fixture: ComponentFixture<ItemGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGridComponent, ItemUnidadePipe ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
