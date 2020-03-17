import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadDetalleModalComponent } from './seguridad-detalle-modal.component';

describe('SeguridadDetalleModalComponent', () => {
  let component: SeguridadDetalleModalComponent;
  let fixture: ComponentFixture<SeguridadDetalleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguridadDetalleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
