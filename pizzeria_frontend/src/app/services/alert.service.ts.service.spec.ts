import { TestBed } from '@angular/core/testing';

import { AlertServiceTsService } from './alert.service.ts.service';

describe('AlertServiceTsService', () => {
  let service: AlertServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
