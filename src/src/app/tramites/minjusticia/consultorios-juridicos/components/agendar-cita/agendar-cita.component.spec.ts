import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarCitaComponent } from './agendar-cita.component';
import { Router } from '@angular/router';
import { MinjusticiaUtilsService } from '../../services/minjusticia-utils.service';
import { VerConsultoriosJuridicosItemComponent } from '../ver-consultorios-juridicos-item/ver-consultorios-juridicos-item.component';

describe('AgendarCitaComponent', () => {
  let component: AgendarCitaComponent;
  let fixture: ComponentFixture<AgendarCitaComponent>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let service: Partial<MinjusticiaUtilsService>;
  let router: Router;

  service = {
    getConsultorioSelected: () => { return undefined; }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendarCitaComponent, VerConsultoriosJuridicosItemComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: MinjusticiaUtilsService, useValue: service }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarCitaComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Debería redirigir a la vista de consultorios cuando el servicio no tenga un consultorio seleccionado", () => {    
    component.ngOnInit();    
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(navArgs[0]).toBe("/minjusticia/listarConsultorios");
    });
  });
});
