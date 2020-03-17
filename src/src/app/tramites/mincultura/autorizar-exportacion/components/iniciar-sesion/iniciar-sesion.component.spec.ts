import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarSesionComponent } from './iniciar-sesion.component';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

describe('IniciarSesionComponent', () => {
  let component: IniciarSesionComponent;
  let fixture: ComponentFixture<IniciarSesionComponent>;
  let modalService: NgbModal;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    component=new IniciarSesionComponent(new AutorizarExportacionUtilService(), formBuilder, modalService );
  });

  it('Creacion del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Acción Iniciar sesión', () => {
    component.asignarVariables();
    expect(component.service.paso).toBe(2);
  });

});
