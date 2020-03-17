import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntaDocumentoComponent } from './adjunta-documento.component';

describe('AdjuntaDocumentoComponent', () => {
  let component: AdjuntaDocumentoComponent;
  let fixture: ComponentFixture<AdjuntaDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjuntaDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
