import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoNoPropiedadComponent } from './certificado-no-propiedad.component';

describe('CertificadoNoPropiedadComponent', () => {
  let component: CertificadoNoPropiedadComponent;
  let fixture: ComponentFixture<CertificadoNoPropiedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoNoPropiedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoNoPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
