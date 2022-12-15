import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfomationAuctionBuyerComponent } from './infomation-auction-buyer.component';

describe('InfomationAuctionBuyerComponent', () => {
  let component: InfomationAuctionBuyerComponent;
  let fixture: ComponentFixture<InfomationAuctionBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfomationAuctionBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfomationAuctionBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
