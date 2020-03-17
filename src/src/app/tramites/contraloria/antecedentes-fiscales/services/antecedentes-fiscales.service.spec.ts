import { TestBed } from '@angular/core/testing';

import { AntecedentesFiscalesService } from './antecedentes-fiscales.service';

describe('AntecedentesFiscalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AntecedentesFiscalesService = TestBed.get(AntecedentesFiscalesService);
    expect(service).toBeTruthy();
  });
});
