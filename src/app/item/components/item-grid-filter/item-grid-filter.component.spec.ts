import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGridFilterComponent } from './item-grid-filter.component';

describe('ItemGridFilterComponent', () => {
  let component: ItemGridFilterComponent;
  let fixture: ComponentFixture<ItemGridFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGridFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGridFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
