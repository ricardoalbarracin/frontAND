import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarSolicitudComponent } from './ingresar-solicitud.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder} from '@angular/forms';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';

describe('IngresarSolicitudComponent', () => {
  let component: IngresarSolicitudComponent;
  let modalService: NgbModal;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    component=new IngresarSolicitudComponent(formBuilder, modalService, new AutorizarExportacionUtilService());
  });


  it('Creacion del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Acción Guardar', () => {
    component.asignarVariables();
    expect(component.submitted).toBe(true);
  });

  it('Acción Cancelar', () => {
    component.volver();
    expect(component.service.paso).toBe(1);
  });


});
