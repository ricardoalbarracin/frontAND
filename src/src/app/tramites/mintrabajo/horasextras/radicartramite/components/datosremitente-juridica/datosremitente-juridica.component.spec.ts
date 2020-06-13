import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosremitenteJuridicaComponent } from './datosremitente-juridica.component';

describe('DatosremitenteJuridicaComponent', () => {
  let component: DatosremitenteJuridicaComponent;
  let fixture: ComponentFixture<DatosremitenteJuridicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosremitenteJuridicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosremitenteJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
