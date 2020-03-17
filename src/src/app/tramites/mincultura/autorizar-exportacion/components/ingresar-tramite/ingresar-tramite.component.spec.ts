import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarTramiteComponent } from './ingresar-tramite.component';
import { AutorizarExportacionUtilService } from '../../services/autorizar-exportacion-util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('IngresarTramiteComponent', () => {
  let component: IngresarTramiteComponent;
  let fixture: ComponentFixture<IngresarTramiteComponent>;
  let modalService: NgbModal;

  beforeEach(() => {
    component=new IngresarTramiteComponent(new AutorizarExportacionUtilService(), modalService);
  });


  it('Creacion del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Acción Ingresar Tramite', () => {
    component.ngOnInit();
    component.ingresarSolicitud();
    expect(component.service.paso).toBe(2);
  });

  it('Acción Consultar Tramite', () => {
    component.consultarSolicitud(); 
    expect(component.service.paso).toBe(5);
  });


});
