import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosremitenteEstablecimientoComponent } from './datosremitente-establecimiento.component';

describe('DatosremitenteEstablecimientoComponent', () => {
  let component: DatosremitenteEstablecimientoComponent;
  let fixture: ComponentFixture<DatosremitenteEstablecimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosremitenteEstablecimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosremitenteEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
