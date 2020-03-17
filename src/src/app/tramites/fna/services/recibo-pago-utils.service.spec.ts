import { TestBed } from '@angular/core/testing';

import { ReciboPagoUtilsService } from './recibo-pago-utils.service';

describe('ReciboPagoUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReciboPagoUtilsService = TestBed.get(ReciboPagoUtilsService);
    expect(service).toBeTruthy();
  });
});
