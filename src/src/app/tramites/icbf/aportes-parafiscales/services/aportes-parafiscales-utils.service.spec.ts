import { TestBed } from '@angular/core/testing';

import {AportesParafiscalesUtilsService} from './aportes-parafiscales-utils.service';

describe('SenaUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AportesParafiscalesUtilsService = TestBed.get(AportesParafiscalesUtilsService);
    expect(service).toBeTruthy();
  });
});
