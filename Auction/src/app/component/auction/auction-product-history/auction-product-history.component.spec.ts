import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionProductHistoryComponent } from './auction-product-history.component';

describe('AuctionProductHistoryComponent', () => {
  let component: AuctionProductHistoryComponent;
  let fixture: ComponentFixture<AuctionProductHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionProductHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionProductHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
