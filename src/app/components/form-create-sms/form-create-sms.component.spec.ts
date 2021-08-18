import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateSmsComponent } from './form-create-sms.component';

describe('FormCreateSmsComponent', () => {
  let component: FormCreateSmsComponent;
  let fixture: ComponentFixture<FormCreateSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
