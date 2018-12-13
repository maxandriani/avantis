import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoItemPageComponent } from './novo-item-page.component';

describe('NovoItemPageComponent', () => {
  let component: NovoItemPageComponent;
  let fixture: ComponentFixture<NovoItemPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoItemPageComponent ]
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
