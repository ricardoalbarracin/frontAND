import { TestBed } from '@angular/core/testing';

import { TramitarPasaporteService } from './tramitar-pasaporte.service';

describe('TramitarPasaporteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TramitarPasaporteService = TestBed.get(TramitarPasaporteService);
    expect(service).toBeTruthy();
  });
});
