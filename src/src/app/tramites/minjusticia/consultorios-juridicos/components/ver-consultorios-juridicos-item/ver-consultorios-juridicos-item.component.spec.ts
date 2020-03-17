import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { VerConsultoriosJuridicosItemComponent } from './ver-consultorios-juridicos-item.component';
import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { ConsultorioJuridico } from '../../models/ConsultorioJuridico';

describe('VerConsultoriosJuridicosItemComponent', () => {
  let component: VerConsultoriosJuridicosItemComponent;
  let fixture: ComponentFixture<VerConsultoriosJuridicosItemComponent>;
  const consultorio = {
    nombre: "Politécnico gran colombiano" ,
    direccion: "Calle falsa 123",
    telefono: 1122233445,
    email: "and@and.com",
    latitud: 123123123,
    longitud: 12312312
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerConsultoriosJuridicosItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerConsultoriosJuridicosItemComponent);
    component = fixture.componentInstance;
    component.consultorio = consultorio;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("debería cargar la información del consultorio dado", () => { 
    fixture.detectChanges();

    const detalleDebug: DebugElement = fixture.debugElement;
    const detalleElement : HTMLElement = detalleDebug.nativeElement;
    const detalleTitulo = detalleElement.querySelector(".title-consultorio"); 
    const detalleDireccion = detalleElement.querySelector(".direccion-consultorio"); 
    const detalleTelefono = detalleElement.querySelector(".telefono-consultorio"); 
    const detalleCorreo = detalleElement.querySelector(".email-consultorio"); 

    expect(detalleTitulo.textContent).toContain(consultorio.nombre);
    expect(detalleDireccion.textContent).toContain(consultorio.direccion);
    expect(detalleTelefono.textContent).toContain(consultorio.telefono.toString());
    expect(detalleCorreo.textContent).toContain(consultorio.email);
  });

  it("Debería mostrar el botón de selección de consultorio", () => {
    component.showButton = true;
    fixture.detectChanges();

    const detalleDebug: DebugElement = fixture.debugElement;
    const detalleElement : HTMLElement = detalleDebug.nativeElement;

    const elem = detalleElement.querySelector("button");

    expect(elem).toBeTruthy();
  });

  it("Debería ocultar el botón de selección de consultorio", () => {
    component.showButton = false;
    fixture.detectChanges();

    const detalleDebug: DebugElement = fixture.debugElement;
    const detalleElement : HTMLElement = detalleDebug.nativeElement;

    const elem = detalleElement.querySelector("button");

    expect(elem).toBeNull();
  });

  it("Debería cargar el evento de selección del consultorio", () => {    
    let itemSelected: ConsultorioJuridico;               
    const detalleDebug: DebugElement = fixture.debugElement;
    const detalleElement : HTMLElement = detalleDebug.nativeElement;
    component.showButton = true;
    fixture.detectChanges();

    component.clickEvent.subscribe((consultorio: ConsultorioJuridico) => itemSelected = consultorio);    
    
    const btn = detalleElement.querySelector("button");
    btn.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(itemSelected).toEqual(consultorio);
    });
  });
});
