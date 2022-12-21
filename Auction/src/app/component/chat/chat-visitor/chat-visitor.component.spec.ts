import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatVisitorComponent } from './chat-visitor.component';

describe('ChatVisitorComponent', () => {
  let component: ChatVisitorComponent;
  let fixture: ComponentFixture<ChatVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
