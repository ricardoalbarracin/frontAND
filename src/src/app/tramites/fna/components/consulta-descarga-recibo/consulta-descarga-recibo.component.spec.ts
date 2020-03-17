import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDescargaReciboComponent } from './consulta-descarga-recibo.component';

describe('ConsultaDescargaReciboComponent', () => {
  let component: ConsultaDescargaReciboComponent;
  let fixture: ComponentFixture<ConsultaDescargaReciboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaDescargaReciboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDescargaReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
