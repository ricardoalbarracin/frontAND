import { TestBed } from '@angular/core/testing';

import { LicenciaConduccionService } from './licencia-conduccion.service';

describe('LicenciaConduccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LicenciaConduccionService = TestBed.get(LicenciaConduccionService);
    expect(service).toBeTruthy();
  });
});
