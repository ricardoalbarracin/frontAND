import { TestBed } from '@angular/core/testing';

import { AgendamientoAuthenticationService } from './agendamiento-authentication.service';

describe('AgendamientoAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgendamientoAuthenticationService = TestBed.get(AgendamientoAuthenticationService);
    expect(service).toBeTruthy();
  });
});
