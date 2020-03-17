import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SancionesDetalleModalComponent } from './sanciones-detalle-modal.component';

describe('SancionesDetalleModalComponent', () => {
  let component: SancionesDetalleModalComponent;
  let fixture: ComponentFixture<SancionesDetalleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SancionesDetalleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SancionesDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
