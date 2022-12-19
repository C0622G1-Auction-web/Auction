import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWithGoogleComponent } from './register-with-google.component';

describe('RegisterWithGoogleComponent', () => {
  let component: RegisterWithGoogleComponent;
  let fixture: ComponentFixture<RegisterWithGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterWithGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterWithGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
