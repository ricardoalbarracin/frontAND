import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrestadoresFiltroComponent } from './prestadores-filtro.component';
import { MinsaludConsultaUtilService } from '../../../services/minsalud-consulta-util.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { PrestadoresDetalleComponent } from '../prestadores-detalle/prestadores-detalle.component';
import { RecaptchaService } from '@shared/services/recaptcha/recaptcha.service';

describe('PrestadoresComponent', () => {
  let component: PrestadoresFiltroComponent;
  let formBuilder: FormBuilder;
  let service: MinsaludConsultaUtilService;
  let prestadorDetalle: PrestadoresDetalleComponent;
  let recaptchaService: RecaptchaService;

  //Arrange -> Preparar
  beforeEach(() => {
    component = new PrestadoresFiltroComponent(formBuilder, service, prestadorDetalle, recaptchaService); 
  });

  it('Prestadores component buscar', () => {
    component.buscar();
    expect(component.concultaService.mostrarDetalle).toBe(true);
  });
  it('Prestadores component limpiar', () => {
    component.concultaService.mostrarDetalle=true;
    component.concultaService.mostrarDetalleSinResultados=true;
    component.concultaService.descargaCompleta=true;
    component.limpiar();
    expect(component.concultaService.mostrarDetalle).toBe(false);
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(false);
    expect(component.concultaService.descargaCompleta).toBe(false);
  });
  it('Prestadores component buscar sin resultados', () => {
    component.numeroDocumento=1;
    component.buscar();
    expect(component.concultaService.mostrarDetalleSinResultados).toBe(true);
  });
  it('Prestadores component descargar', () => {
    component.buscar();
    component.descargarResultados();
    expect(component.concultaService.descargaCompleta).toBe(true);
  });
});