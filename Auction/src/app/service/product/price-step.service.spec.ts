import { TestBed } from '@angular/core/testing';

import { PriceStepService } from './price-step.service';

describe('PriceStepService', () => {
  let service: PriceStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
