import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerConsultoriosJuridicosModalComponent } from './ver-consultorios-juridicos-modal.component';
import { VerConsultoriosJuridicosItemComponent } from '../ver-consultorios-juridicos-item/ver-consultorios-juridicos-item.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import { ConsultorioJuridico } from '../../models/ConsultorioJuridico';
import { By } from '@angular/platform-browser';

describe('VerConsultoriosJuridicosModalComponent', () => {
  let component: VerConsultoriosJuridicosModalComponent;
  let fixture: ComponentFixture<VerConsultoriosJuridicosModalComponent>;
  let service: Partial<MinjusticiaUtilsService>;

  const consultorio = {
    id: 1,
    ConsultorioNombre: "Politécnico gran colombiano",
    ConsultorioDireccion: "Calle falsa 123",
    ConsultorioTelefono: 123123,
    ConsultorioEmail: "asdasd@adsasd.com",
    ConsultorioLatidud: 123123123,
    ConsultorioLongitud: 12312312
  }

  const horarios = [
    { 
      DisponibilidadHora: "8:00",
      id : 1
    },
    { 
      DisponibilidadHora: "9:00",
      id : 2
    }
  ];

  service = {
    getHorariosConsultorio: () => horarios
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerConsultoriosJuridicosModalComponent, VerConsultoriosJuridicosItemComponent ],
      imports: [
        NgbModule
      ],
      providers: [ NgbActiveModal,
        { provide: MinjusticiaUtilsService, useValue: service},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerConsultoriosJuridicosModalComponent);
    component = fixture.componentInstance;
    component.consultorio = consultorio;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //debe cargar la información en el componente interno de detalle del consultorio
  it("Debería cargar la información del consultorio", () => { 
    const consultorioDebug: DebugElement = fixture.debugElement;
    const consultorioElement : HTMLElement = consultorioDebug.nativeElement;
    var title = consultorioElement.querySelector(".title-consultorio"); 
 
    expect(title.textContent).toContain(consultorio.ConsultorioNombre);
  });

  it("Deberia cargar los horarios disponibles para el consultorio", () => {
    component.ngOnInit();
    const consultorioDebug: DebugElement = fixture.debugElement;
    const consultorioElement : HTMLElement = consultorioDebug.nativeElement;

    var listHorarios = consultorioElement.querySelectorAll(".btn-cita"); 

    expect(listHorarios.length).toEqual(horarios.length);    
  });

  it("Debería seleccionar el primer horario disponible", () => {
    component.ngOnInit();
    const consultorioDebug: DebugElement = fixture.debugElement;
    const consultorioElement : HTMLElement = consultorioDebug.nativeElement;
    
    var listHorarios = consultorioElement.querySelectorAll(".btn-cita"); 
    var btn = listHorarios[0].querySelector("button");
    btn.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.itemSelected).toEqual(horarios[0]);
    });  
  }); 

  it("Debería retornar el objeto del consultorio con su respectivo horario", () => {
    component.ngOnInit();

    let item : {};    
    const itemExpected = {
      id: 1,
      ConsultorioNombre: "Politécnico gran colombiano",
      ConsultorioDireccion: "Calle falsa 123",
      ConsultorioTelefono: 123123,
      ConsultorioEmail: "asdasd@adsasd.com",
      ConsultorioLatidud: 123123123,
      ConsultorioLongitud: 12312312,
      horario: { 
        DisponibilidadHora: "8:00",
        id : 1
      }
    }
    component.selectEvent.subscribe((consultorio: ConsultorioJuridico) => item = consultorio);  

    const consultorioDebug: DebugElement = fixture.debugElement;
    const consultorioElement : HTMLElement = consultorioDebug.nativeElement;
    
    var listHorarios = consultorioElement.querySelectorAll(".btn-cita"); 
    var btn = listHorarios[0].querySelector("button");

    btn.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      var btn = consultorioDebug.query(By.css(".select-consultorio-modal"));
      btn.triggerEventHandler("click", null);

      fixture.whenStable().then(() => {
        expect(item).toEqual(itemExpected);
      });  
      
    });  
  });
});
