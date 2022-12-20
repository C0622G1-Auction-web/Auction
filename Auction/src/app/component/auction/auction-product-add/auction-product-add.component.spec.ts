import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionProductAddComponent } from './auction-product-add.component';

describe('AuctionProductAddComponent', () => {
  let component: AuctionProductAddComponent;
  let fixture: ComponentFixture<AuctionProductAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionProductAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
