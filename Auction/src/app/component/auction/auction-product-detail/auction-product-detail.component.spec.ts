import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionProductDetailComponent } from './auction-product-detail.component';

describe('AuctionProductDetailComponent', () => {
  let component: AuctionProductDetailComponent;
  let fixture: ComponentFixture<AuctionProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
