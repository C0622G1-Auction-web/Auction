import { TestBed } from '@angular/core/testing';

import { ChatVisitorService } from './chat-visitor.service';

describe('ChatVisitorService', () => {
  let service: ChatVisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatVisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
