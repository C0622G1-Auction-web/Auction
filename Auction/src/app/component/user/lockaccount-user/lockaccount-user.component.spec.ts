import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockaccountUserComponent } from './lockaccount-user.component';

describe('LockaccountUserComponent', () => {
  let component: LockaccountUserComponent;
  let fixture: ComponentFixture<LockaccountUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockaccountUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockaccountUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
