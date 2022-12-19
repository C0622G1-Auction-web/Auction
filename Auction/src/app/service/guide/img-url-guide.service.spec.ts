import { TestBed } from '@angular/core/testing';

import { ImgUrlGuideService } from './img-url-guide.service';

describe('ImgUrlGuideService', () => {
  let service: ImgUrlGuideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgUrlGuideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
