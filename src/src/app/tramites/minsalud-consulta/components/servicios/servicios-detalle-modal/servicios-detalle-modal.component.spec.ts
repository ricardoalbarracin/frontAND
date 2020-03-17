import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosDetalleModalComponent } from './servicios-detalle-modal.component';

describe('ServiciosDetalleModalComponent', () => {
  let component: ServiciosDetalleModalComponent;
  let fixture: ComponentFixture<ServiciosDetalleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosDetalleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
