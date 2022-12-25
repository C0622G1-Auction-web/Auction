import { TestBed } from '@angular/core/testing';

import { NotificationServiceByUserService } from './notification-service-by-user.service';

describe('NotificationServiceByUserService', () => {
  let service: NotificationServiceByUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationServiceByUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
