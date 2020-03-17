import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarEstadoComponent } from './consultar-estado.component';

describe('ConsultarEstadoComponent', () => {
  let component: ConsultarEstadoComponent;
  let fixture: ComponentFixture<ConsultarEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
