import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerConsultoriosJuridicosComponent } from './ver-consultorios-juridicos.component';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import { NgbModal, NgbModalOptions, NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { VerConsultoriosJuridicosItemComponent } from '../ver-consultorios-juridicos-item/ver-consultorios-juridicos-item.component';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';


describe('VerConsultoriosJuridicosComponent', () => {
  let component: VerConsultoriosJuridicosComponent;
  let fixture: ComponentFixture<VerConsultoriosJuridicosComponent>;

  //Modificar prueba para adecuarse a método asincrono cuando se actualice el servicio
  let service: Partial<MinjusticiaUtilsService>;
  let router: Router;
  let modalService: NgbModal;
  let mockModalRef: NgbModalRef;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const listadoConsultorios = [{
    id: 1,
    ConsultorioNombre: "Politécnico gran colombiano" ,
    ConsultorioDireccion: "Calle falsa 123",
    ConsultorioTelefono: 123123,
    ConsultorioEmail: "asdasd@adsasd.com",
    ConsultorioLatidud: 123123123,
    ConsultorioLongitud: 12312312
  },
  {
    id: 2,
    ConsultorioNombre: "Universidad de los mega llanos" ,
    ConsultorioDireccion: "Calle falsa 123",
    ConsultorioTelefono: 123123,
    ConsultorioEmail: "asdasd@adsasd.com",
    ConsultorioLatidud: 123123123,
    ConsultorioLongitud: 12312312
  }];

  service = {
    getQueryParams: () => { 
      return { 
        idCiudad: 1,
        ciudad: "Villavicencio",
        fecha: new Date(),
        fechaString: (new Date()).toString(),
        latitud: 123123123,
        longitud: 12312312
      } 
    },
    setQueryParams: (item: any) => {
      this.params = undefined;
    },
    getListConsultoriosJuridicos: () => {
      return listadoConsultorios;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerConsultoriosJuridicosComponent, VerConsultoriosJuridicosItemComponent],
      providers: [
        { provide: MinjusticiaUtilsService, useValue: service},
        { provide: Router, useValue: routerSpy}
      ],
      imports: [
        NgbModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerConsultoriosJuridicosComponent);
    component = fixture.componentInstance;

    modalService = TestBed.get(NgbModal);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Verifica la visualización del listado de consultorios
  it("Debería cargar el listado de consultorios disponibles", () => { 
    component.ngOnInit();
    const listadoDebug: DebugElement = fixture.debugElement;
    const listadoElement : HTMLElement = listadoDebug.nativeElement;
    const itemList = listadoElement.querySelectorAll(".list-consultorios-item");

    expect(itemList.length).toEqual(listadoConsultorios.length);
  });

  it("Deberá hacer el llamado a la ventana modal de selección de agenda", () => {
    spyOn(modalService, 'open').and.returnValue(mockModalRef);

    const listadoDebug: DebugElement = fixture.debugElement;
    const listadoElement : HTMLElement = listadoDebug.nativeElement;
    
    const btn = listadoElement.querySelectorAll("button");
    btn[0].click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(modalService.open).toHaveBeenCalled();
    });
  });

  //Modifica el retorno del servicio para no poseer valores asignados del filtros
  service.getQueryParams = () => {
    return undefined;
  }
  it("Debería redireccionar al no encontrar filtros de busqueda asignados", () => {
    component.ngOnInit();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    expect(navArgs[0]).toBe("/minjusticia");
  });
});
