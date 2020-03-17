import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarAgendaComponent } from './buscar-agenda.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DebugElement, Query } from '@angular/core';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import { QueryParams } from '../../models/ConsultorioJuridico';


describe('BuscarAgendaComponent', () => {
  let component: BuscarAgendaComponent;
  let fixture: ComponentFixture<BuscarAgendaComponent>;
  let service: Partial<MinjusticiaUtilsService>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let itemDebug: DebugElement;
  let itemElement : HTMLElement;
  let itemSelected: QueryParams;
  let router: Router;

  service = {
    setQueryParams: (queryParams: QueryParams) => {
      itemSelected = queryParams;
    }
  }

  const expectValue: QueryParams = {
    ciudad: "1",
    idCiudad: 20,
    fecha: new Date(2019, 10, 1)
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarAgendaComponent ],
      imports: [
        NgbModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy},
        { provide: MinjusticiaUtilsService, useValue: service } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarAgendaComponent);
    component = fixture.componentInstance;
    itemDebug = fixture.debugElement;
    itemElement = itemDebug.nativeElement;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Debería mostrar alerta de formulario no valido", () => {
    component.ngOnInit();

    let btn = itemElement.querySelector("button");
    btn.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();      
      let errorDiv = itemElement.querySelector("#error-message");

      expect(errorDiv).toBeTruthy();
    });
  });

  it("Debería validar correctamente el formulario y guardar en el servicio los valores diligenciados", () => {
    component.ngOnInit();

    //formulario diligenciado
    component.form.setValue({
      ciudad: 1,
      fecha: { year: 2019, month: 11, day: 1}
    });

    let btn = itemElement.querySelector("button");
    btn.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();  
      expect(expectValue).toEqual(itemSelected);
    });
  });

  it("Debería redirigir a vista de listado de consultorios cuando el formulario pase la validación", () => { 
    component.ngOnInit();
    const spy = router.navigate as jasmine.Spy;

    //formulario diligenciado
    component.form.setValue({
      ciudad: 1,
      fecha: { year: 2019, month: 11, day: 1}
    });

    let btn = itemElement.querySelector("button");
    btn.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges(); 
      const navArgs = spy.calls.first().args[0];

      expect(navArgs[0]).toBe("/minjusticia/listarConsultorios");
    });
  });
   
});
