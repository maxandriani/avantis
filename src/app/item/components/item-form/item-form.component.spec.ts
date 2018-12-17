import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule as AvCommonModule } from '../../../common/common.module';
import { ItemFormComponent } from './item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatInputModule, MatSlideToggleModule, MatDialogModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemFormComponent', () => {
  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AvCommonModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatInputModule,
        MatSlideToggleModule,
        MatDialogModule
      ],
      declarations: [ ItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
