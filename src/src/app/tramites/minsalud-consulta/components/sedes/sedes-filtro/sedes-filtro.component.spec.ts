import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { SedesFiltroComponent } from './sedes-filtro.component';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { SedesDetalleComponent } from '../sedes-detalle/sedes-detalle.component';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';

describe('SedesComponent', () => {
  let component: SedesFiltroComponent;
  let formBuilder: FormBuilder;
  let service: MinsaludConsultaUtilService;
  let sedesDetalle: SedesDetalleComponent;
  let recaptchaService: RecaptchaService;

  beforeEach(() => {
    component = new SedesFiltroComponent(formBuilder, service, sedesDetalle, recaptchaService); 
  });

  it('Sedes component buscar', () => {
    component.buscar();
    expect(component.concultaService.mostrarDetalle).toBe(true);
  });
  it('Sedes component limpiar', () => {
    component.concultaService.mostrarDetalle=true;
    component.concultaService.mostrarDetalleSinResultados=true;
    component.concultaService.descargaCompleta=true;
    component.limpiar();
    expect(component.concultaService.mostrarDetalle).toBe(false);
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(false);
    expect(component.concultaService.descargaCompleta).toBe(false);
  });
  it('Sedes component buscar sin resultados', () => {
    component.numeroDocumento=1;
    component.buscar();
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(true);
  });
  it('Sedes component descargar', () => {
    component.buscar();
    component.descargarResultados();
    expect(component.concultaService.descargaCompleta).toBe(true);
  });
});