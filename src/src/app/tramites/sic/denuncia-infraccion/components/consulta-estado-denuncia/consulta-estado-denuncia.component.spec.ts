import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEstadoDenunciaComponent } from './consulta-estado-denuncia.component';

describe('ConsultaEstadoDenunciaComponent', () => {
  let component: ConsultaEstadoDenunciaComponent;
  let fixture: ComponentFixture<ConsultaEstadoDenunciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaEstadoDenunciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEstadoDenunciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
