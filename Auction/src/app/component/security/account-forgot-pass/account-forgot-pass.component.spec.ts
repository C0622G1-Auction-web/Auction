import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountForgotPassComponent } from './account-forgot-pass.component';

describe('AccountForgotPassComponent', () => {
  let component: AccountForgotPassComponent;
  let fixture: ComponentFixture<AccountForgotPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountForgotPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountForgotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
