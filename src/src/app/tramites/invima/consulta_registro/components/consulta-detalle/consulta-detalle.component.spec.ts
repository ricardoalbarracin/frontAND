import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDetalleComponent } from './consulta-detalle.component';

describe('ConsultaDetalleComponent', () => {
  let component: ConsultaDetalleComponent;
  let fixture: ComponentFixture<ConsultaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
