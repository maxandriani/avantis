import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorComponent } from './dialog-error.component';
import { MatDialogModule, MatExpansionModule, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogErrorComponent', () => {
  let component: DialogErrorComponent;
  let fixture: ComponentFixture<DialogErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatExpansionModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [ DialogErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
