import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SancionesFiltroComponent } from './sanciones-filtro.component';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { SancionesDetalleComponent } from '../sanciones-detalle/sanciones-detalle.component';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';

describe('SancionesComponent', () => {
  let component: SancionesFiltroComponent;

  let service: MinsaludConsultaUtilService;
  let detalle: SancionesDetalleComponent;
  let recaptchaService: RecaptchaService;

  beforeEach(() => {
    component = new SancionesFiltroComponent(service, detalle, recaptchaService);
  });

  it('Sanciones component buscar', () => {
    component.buscar();
    expect(component.concultaService.mostrarDetalle).toBe(true);
  });
  it('Sanciones component limpiar', () => {
    component.concultaService.mostrarDetalle=true;
    component.concultaService.mostrarDetalleSinResultados=true;
    component.concultaService.descargaCompleta=true;
    component.limpiar();
    expect(component.concultaService.mostrarDetalle).toBe(false);
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(false);
    expect(component.concultaService.descargaCompleta).toBe(false);
  });
  it('Sanciones component buscar sin resultados', () => {
    component.numeroDocumento=1;
    component.buscar();
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(true);
  });
  it('Sanciones component descargar', () => {
    component.buscar();
    component.descargarResultados();
    expect(component.concultaService.descargaCompleta).toBe(true);
  });
});