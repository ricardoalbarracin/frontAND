import { TestBed } from '@angular/core/testing';

import { MinsaludConsultaUtilService } from './minsalud-consulta-util.service';

describe('MinsaludConsultaUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinsaludConsultaUtilService = TestBed.get(MinsaludConsultaUtilService);
    expect(service).toBeTruthy();
  });
});
