import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoItemPageComponent } from './novo-item-page.component';
import { ItemFormComponent } from '../../components/item-form/item-form.component';
import { MatDialogModule, MatSlideToggleModule, MatInputModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule as AvCommonModule } from '../../../common/common.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('NovoItemPageComponent', () => {
  let component: NovoItemPageComponent;
  let fixture: ComponentFixture<NovoItemPageComponent>;

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
        MatDialogModule,
        RouterTestingModule
      ],
      declarations: [ NovoItemPageComponent, ItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
