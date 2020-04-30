import { TestBed } from '@angular/core/testing';

import { RuviService } from './ruvi.service';

describe('RuviService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RuviService = TestBed.get(RuviService);
    expect(service).toBeTruthy();
  });
});
