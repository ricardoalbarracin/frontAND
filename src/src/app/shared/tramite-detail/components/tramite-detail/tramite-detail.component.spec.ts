import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteDetailComponent } from './tramite-detail.component';
import { DebugElement } from '@angular/core';

describe('TramiteDetailComponent', () => {
  let component: TramiteDetailComponent;
  let fixture: ComponentFixture<TramiteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramiteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramiteDetailComponent);
    component = fixture.componentInstance;
    component["name"] = "consultorios-juridicos";
    component["owner"] = "minjusticia";    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Deberá mostrar el detalle del tramite minjusticia", () => {
    //Consulta los valores de un trámite
    fixture.detectChanges();
    component.ngOnInit();    

    const tramiteDebug: DebugElement = fixture.debugElement;
    const tramiteElement : HTMLElement = tramiteDebug.nativeElement;
    const tramiteOwner = tramiteElement.querySelector("#minjusticiaOwner"); 

    expect(tramiteOwner.textContent).toContain("Ministerio de justicia");
  });
});
