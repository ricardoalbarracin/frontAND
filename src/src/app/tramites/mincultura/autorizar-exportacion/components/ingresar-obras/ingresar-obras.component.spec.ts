import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarObrasComponent } from './ingresar-obras.component';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

describe('IngresarObrasComponent', () => {
  let component: IngresarObrasComponent;
  let fixture: ComponentFixture<IngresarObrasComponent>;
  let modalService: NgbModal;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    component=new IngresarObrasComponent(formBuilder, modalService, new AutorizarExportacionUtilService());
  });


  it('Creacion del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Acción Guardar Obra', () => {
    component.asignarVariables();
    expect(component.submitted).toBe(true);
  });

  it('Acción Enviar al Ministerio', () => {
    component.asignarVariablesEnviarMinisterio();
    expect(component.service.paso).toBe(-1);
  });



});
