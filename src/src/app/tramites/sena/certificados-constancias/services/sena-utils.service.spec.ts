import { TestBed } from '@angular/core/testing';

import { SenaUtilsService } from './sena-utils.service';

describe('SenaUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SenaUtilsService = TestBed.get(SenaUtilsService);
    expect(service).toBeTruthy();
  });
});
