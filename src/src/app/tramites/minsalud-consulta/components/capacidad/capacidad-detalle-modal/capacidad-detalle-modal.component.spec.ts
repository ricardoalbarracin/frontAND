import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadDetalleModalComponent } from './capacidad-detalle-modal.component';

describe('CapacidadDetalleModalComponent', () => {
  let component: CapacidadDetalleModalComponent;
  let fixture: ComponentFixture<CapacidadDetalleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapacidadDetalleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
