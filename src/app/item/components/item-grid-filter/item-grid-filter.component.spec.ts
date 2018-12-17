import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGridFilterComponent } from './item-grid-filter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatInputModule } from '@angular/material';

describe('ItemGridFilterComponent', () => {
  let component: ItemGridFilterComponent;
  let fixture: ComponentFixture<ItemGridFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        ReactiveFormsModule
      ],
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
