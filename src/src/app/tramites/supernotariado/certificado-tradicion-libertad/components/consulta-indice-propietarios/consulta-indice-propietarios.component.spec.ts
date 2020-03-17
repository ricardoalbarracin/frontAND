import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaIndicePropietariosComponent } from './consulta-indice-propietarios.component';

describe('ConsultaIndicePropietariosComponent', () => {
  let component: ConsultaIndicePropietariosComponent;
  let fixture: ComponentFixture<ConsultaIndicePropietariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaIndicePropietariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaIndicePropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
