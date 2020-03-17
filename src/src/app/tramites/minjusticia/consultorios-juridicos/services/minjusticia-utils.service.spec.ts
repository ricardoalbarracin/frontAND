import { TestBed } from '@angular/core/testing';

import { MinjusticiaUtilsService } from './minjusticia-utils.service';

describe('MinjusticiaUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinjusticiaUtilsService = TestBed.get(MinjusticiaUtilsService);
    expect(service).toBeTruthy();
  });
});
