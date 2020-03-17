import { TestBed } from '@angular/core/testing';

import { AutorizarExportacionUtilService } from './autorizar-exportacion-util.service';

describe('AutorizarExportacionUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutorizarExportacionUtilService = TestBed.get(AutorizarExportacionUtilService);
    expect(service).toBeTruthy();
  });
});
