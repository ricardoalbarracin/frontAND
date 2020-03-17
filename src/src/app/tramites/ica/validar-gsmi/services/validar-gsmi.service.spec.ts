/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidarGsmiService } from './validar-gsmi.service';

describe('Service: ValidarGsmi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidarGsmiService]
    });
  });

  it('should ...', inject([ValidarGsmiService], (service: ValidarGsmiService) => {
    expect(service).toBeTruthy();
  }));
});
