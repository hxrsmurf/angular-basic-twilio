import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCreateConversationComponent } from './form-create-conversation.component';

describe('FormCreateConversationComponent', () => {
  let component: FormCreateConversationComponent;
  let fixture: ComponentFixture<FormCreateConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateConversationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
