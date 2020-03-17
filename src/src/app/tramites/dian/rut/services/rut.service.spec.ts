/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RutService } from './rut.service';

describe('Service: Rut', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutService]
    });
  });

  it('should ...', inject([RutService], (service: RutService) => {
    expect(service).toBeTruthy();
  }));
});
