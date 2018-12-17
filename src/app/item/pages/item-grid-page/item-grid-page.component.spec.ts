import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGridPageComponent } from './item-grid-page.component';
import { ItemGridComponent } from '../../components/item-grid/item-grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ItemGridFilterComponent } from '../../components/item-grid-filter/item-grid-filter.component';
import { PageComponent } from 'src/app/common/interface/page/page.component';
import { ItemUnidadePipe } from '../../pipes/item-unidade.pipe';

describe('ItemGridPageComponent', () => {
  let component: ItemGridPageComponent;
  let fixture: ComponentFixture<ItemGridPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [ ItemGridPageComponent, ItemGridComponent, ItemGridFilterComponent, PageComponent, ItemUnidadePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
