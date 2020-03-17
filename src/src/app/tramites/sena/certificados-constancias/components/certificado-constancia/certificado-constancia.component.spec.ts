import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificadoConstanciaComponent } from './certificado-constancia.component';

describe('CertificadoConstanciaComponent', () => {
  let component: CertificadoConstanciaComponent;
  let fixture: ComponentFixture<CertificadoConstanciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoConstanciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoConstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
