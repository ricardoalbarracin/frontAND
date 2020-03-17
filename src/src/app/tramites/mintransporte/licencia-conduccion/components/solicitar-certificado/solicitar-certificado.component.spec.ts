import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarCertificadoComponent } from './solicitar-certificado.component';

describe('SolicitarCertificadoComponent', () => {
  let component: SolicitarCertificadoComponent;
  let fixture: ComponentFixture<SolicitarCertificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarCertificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
