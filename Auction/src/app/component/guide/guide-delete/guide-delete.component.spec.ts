import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideDeleteComponent } from './guide-delete.component';

describe('GuideDeleteComponent', () => {
  let component: GuideDeleteComponent;
  let fixture: ComponentFixture<GuideDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
