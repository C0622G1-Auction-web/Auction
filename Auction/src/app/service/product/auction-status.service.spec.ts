import { TestBed } from '@angular/core/testing';

import { AuctionStatusService } from './auction-status.service';

describe('AuctionStatusService', () => {
  let service: AuctionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
