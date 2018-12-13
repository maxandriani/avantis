import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGridPageComponent } from './item-grid-page.component';

describe('ItemGridPageComponent', () => {
  let component: ItemGridPageComponent;
  let fixture: ComponentFixture<ItemGridPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGridPageComponent ]
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
