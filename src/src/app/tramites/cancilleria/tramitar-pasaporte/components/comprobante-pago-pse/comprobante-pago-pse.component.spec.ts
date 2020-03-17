import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantePagoPseComponent } from './comprobante-pago-pse.component';

describe('ComprobantePagoPseComponent', () => {
  let component: ComprobantePagoPseComponent;
  let fixture: ComponentFixture<ComprobantePagoPseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobantePagoPseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantePagoPseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
