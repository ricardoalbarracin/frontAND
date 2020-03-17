import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioOpcionSolucionComponent } from './inicio-opcion-solucion.component';

describe('InicioOpcionSolucionComponent', () => {
  let component: InicioOpcionSolucionComponent;
  let fixture: ComponentFixture<InicioOpcionSolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioOpcionSolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioOpcionSolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
