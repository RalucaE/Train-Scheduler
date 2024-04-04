import { TestBed } from '@angular/core/testing';

import { TokenexpirationService } from './tokenexpiration.service';

describe('TokenexpirationService', () => {
  let service: TokenexpirationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenexpirationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
