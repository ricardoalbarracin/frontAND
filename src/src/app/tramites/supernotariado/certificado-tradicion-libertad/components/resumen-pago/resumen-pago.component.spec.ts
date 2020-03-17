import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenPagoComponent } from './resumen-pago.component';

describe('ResumenPagoComponent', () => {
  let component: ResumenPagoComponent;
  let fixture: ComponentFixture<ResumenPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
