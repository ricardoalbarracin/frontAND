import { TestBed } from '@angular/core/testing';

import { InvimaUtilsService } from './invima-utils.service';

describe('InvimaUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvimaUtilsService = TestBed.get(InvimaUtilsService);
    expect(service).toBeTruthy();
  });
});
