import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacidadFiltroComponent } from './capacidad-filtro.component';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { CapacidadDetalleComponent } from '../capacidad-detalle/capacidad-detalle.component';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';

describe('CapacidadComponent', () => {
  let component: CapacidadFiltroComponent;

  let service: MinsaludConsultaUtilService;
  let detalle: CapacidadDetalleComponent;
  let recaptchaService: RecaptchaService;

  beforeEach(() => {
    component = new CapacidadFiltroComponent(service, detalle, recaptchaService);
  });

  it('Capacidad component buscar', () => {
    component.buscar();
    expect(component.concultaService.mostrarDetalle).toBe(true);
  });
  it('Capacidad component limpiar', () => {
    component.concultaService.mostrarDetalle=true;
    component.concultaService.mostrarDetalleSinResultados=true;
    component.concultaService.descargaCompleta=true;
    component.limpiar();
    expect(component.concultaService.mostrarDetalle).toBe(false);
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(false);
    expect(component.concultaService.descargaCompleta).toBe(false);
  });
  it('Capacidad component buscar sin resultados', () => {
    component.numeroDocumento=1;
    component.buscar();
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(true);
  });
  it('Capacidad component descargar', () => {
    component.buscar();
    component.descargarResultados();
    expect(component.concultaService.descargaCompleta).toBe(true);
  });
});