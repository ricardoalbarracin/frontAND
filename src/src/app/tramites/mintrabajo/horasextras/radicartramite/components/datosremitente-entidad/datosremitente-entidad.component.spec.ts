import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosremitenteEntidadComponent } from './datosremitente-entidad.component';

describe('DatosremitenteEntidadComponent', () => {
  let component: DatosremitenteEntidadComponent;
  let fixture: ComponentFixture<DatosremitenteEntidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosremitenteEntidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosremitenteEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
