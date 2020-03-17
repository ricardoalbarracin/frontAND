import { TestBed } from '@angular/core/testing';

import { MinsaludModalUtilService } from './minsalud-modal-util.service';

describe('MinsaludModalUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinsaludModalUtilService = TestBed.get(MinsaludModalUtilService);
    expect(service).toBeTruthy();
  });
});
