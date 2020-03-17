import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesDetalleModalComponent } from './sedes-detalle-modal.component';

describe('SedesDetalleModalComponent', () => {
  let component: SedesDetalleModalComponent;
  let fixture: ComponentFixture<SedesDetalleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SedesDetalleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SedesDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
