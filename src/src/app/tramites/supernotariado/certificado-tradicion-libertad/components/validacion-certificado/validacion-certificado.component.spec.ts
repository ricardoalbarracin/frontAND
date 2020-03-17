import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionCertificadoComponent } from './validacion-certificado.component';

describe('ValidacionCertificadoComponent', () => {
  let component: ValidacionCertificadoComponent;
  let fixture: ComponentFixture<ValidacionCertificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacionCertificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
