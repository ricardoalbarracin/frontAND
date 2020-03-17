import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionSolucionComponent } from './seleccion-solucion.component';

describe('SeleccionSolucionComponent', () => {
  let component: SeleccionSolucionComponent;
  let fixture: ComponentFixture<SeleccionSolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionSolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionSolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
