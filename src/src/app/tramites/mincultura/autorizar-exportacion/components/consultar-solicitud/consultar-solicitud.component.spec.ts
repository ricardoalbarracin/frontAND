import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarSolicitudComponent } from './consultar-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';

describe('ConsultarSolicitudComponent', () => {
  let component: ConsultarSolicitudComponent;
  let fixture: ComponentFixture<ConsultarSolicitudComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    component=new ConsultarSolicitudComponent(formBuilder, new AutorizarExportacionUtilService());
  });


  it('Creacion del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Acción Buscar', () => {
    component.asignarVariables();
    expect(component.submitted).toBe(true);
  });

  it('Acción Ver Concepto', () => {
    component.verConcepto();
    expect(component.service.consultarVerConcepto).toBe(true);
  });

  it('Acción Descargar', () => {
    component.verDescargar();
    expect(component.service.consultarVerDescargar).toBe(true);
  });

  it('Acción Limpiar', () => {
    component.limpiar();
    expect(component.service.consultar).toBe(false);
  });


});
