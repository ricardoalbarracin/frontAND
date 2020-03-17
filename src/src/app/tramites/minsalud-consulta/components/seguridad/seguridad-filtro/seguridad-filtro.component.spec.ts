import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeguridadFiltroComponent } from './seguridad-filtro.component';
import { SeguridadDetalleComponent } from '../seguridad-detalle/seguridad-detalle.component';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';

describe('SeguridadComponent', () => {
  let component: SeguridadFiltroComponent;

  let service: MinsaludConsultaUtilService;
  let detalle: SeguridadDetalleComponent;
  let recaptcha: RecaptchaService;

  beforeEach(() => {
    component = new SeguridadFiltroComponent(service, detalle, recaptcha);
  });

  it('Seguridad component buscar', () => {
    component.buscar();
    expect(component.concultaService.mostrarDetalle).toBe(true);
  });
  it('Seguridad component limpiar', () => {
    component.concultaService.mostrarDetalle=true;
    component.concultaService.mostrarDetalleSinResultados=true;
    component.concultaService.descargaCompleta=true;
    component.limpiar();
    expect(component.concultaService.mostrarDetalle).toBe(false);
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(false);
    expect(component.concultaService.descargaCompleta).toBe(false);
  });
  it('Seguridad component buscar sin resultados', () => {
    component.numeroDocumento=1;
    component.buscar();
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(true);
  });
  it('Seguridad component descargar', () => {
    component.buscar();
    component.descargarResultados();
    expect(component.concultaService.descargaCompleta).toBe(true);
  });
});