import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountResetPassComponent } from './account-reset-pass.component';

describe('AccountResetPassComponent', () => {
  let component: AccountResetPassComponent;
  let fixture: ComponentFixture<AccountResetPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountResetPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountResetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
