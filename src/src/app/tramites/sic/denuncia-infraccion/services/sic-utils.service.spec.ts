import { TestBed } from '@angular/core/testing';

import { SicUtilsService } from './sic-utils.service';

describe('SicUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SicUtilsService = TestBed.get(SicUtilsService);
    expect(service).toBeTruthy();
  });
});
