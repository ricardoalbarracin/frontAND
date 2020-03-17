/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TramiteDetailService } from './tramite-detail.service';

describe('Service: TramiteDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TramiteDetailService]
    });
  });

  it('should ...', inject([TramiteDetailService], (service: TramiteDetailService) => {
    expect(service).toBeTruthy();
  }));
});
