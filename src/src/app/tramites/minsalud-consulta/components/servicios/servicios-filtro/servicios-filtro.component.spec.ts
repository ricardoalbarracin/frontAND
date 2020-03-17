import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ServiciosFiltroComponent } from './servicios-filtro.component';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { ServiciosDetalleComponent } from '../servicios-detalle/servicios-detalle.component';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';

describe('ServiciosComponent', () => {
  let component: ServiciosFiltroComponent;
  let fixture: ComponentFixture<ServiciosFiltroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      declarations: [ServiciosFiltroComponent],
      providers: [MinsaludConsultaUtilService, ServiciosDetalleComponent, RecaptchaService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosFiltroComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', 
    inject([MinsaludConsultaUtilService, ServiciosDetalleComponent, RecaptchaService], 
      (concultaService: MinsaludConsultaUtilService, serviciosDetalle: ServiciosDetalleComponent, recaptchaService: RecaptchaService) => {
        expect(component).toBeTruthy();
  }));
  
  it('Servicios component buscar', () => {
    component.buscar();
    expect(component.concultaService.mostrarDetalle).toBe(true);
  });
  it('Servicios component limpiar', () => {
    component.concultaService.mostrarDetalle=true;
    component.concultaService.mostrarDetalleSinResultados=true;
    component.concultaService.descargaCompleta=true;
    component.limpiar();
    expect(component.concultaService.mostrarDetalle).toBe(false);
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(false);
    expect(component.concultaService.descargaCompleta).toBe(false);
  });
  it('Servicios component buscar sin resultados', () => {
    component.numeroDocumento=1;
    component.buscar();
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(true);
  });
  it('Servicios component descargar', () => {
    component.buscar();
    component.descargarResultados();
    expect(component.concultaService.descargaCompleta).toBe(true);
  });
});