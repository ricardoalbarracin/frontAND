import { TestBed } from '@angular/core/testing';

import { CensoIndigenaService } from './censo-indigena.service';
import { HttpClientModule } from '@angular/common/http';

describe('CensoIndigenaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: CensoIndigenaService = TestBed.get(CensoIndigenaService);
    expect(service).toBeTruthy();
  });
});
