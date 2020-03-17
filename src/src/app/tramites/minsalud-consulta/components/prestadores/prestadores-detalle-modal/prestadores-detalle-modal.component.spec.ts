import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestadoresDetalleModalComponent } from './prestadores-detalle-modal.component';

describe('PrestadoresDetalleModalComponent', () => {
  let component: PrestadoresDetalleModalComponent;
  let fixture: ComponentFixture<PrestadoresDetalleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestadoresDetalleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestadoresDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
