import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfomationAuctionSellerComponent } from './infomation-auction-seller.component';

describe('InfomationAuctionSellerComponent', () => {
  let component: InfomationAuctionSellerComponent;
  let fixture: ComponentFixture<InfomationAuctionSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfomationAuctionSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfomationAuctionSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
