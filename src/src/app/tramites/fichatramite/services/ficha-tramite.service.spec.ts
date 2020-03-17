import { TestBed } from '@angular/core/testing';

import { FichaTramiteService } from './ficha-tramite.service';
import { HttpClientModule } from '@angular/common/http';

describe('FichaTramiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: FichaTramiteService = TestBed.get(FichaTramiteService);
    expect(service).toBeTruthy();
  });
});
