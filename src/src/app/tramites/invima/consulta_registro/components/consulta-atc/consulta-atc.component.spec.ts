import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAtcComponent } from './consulta-atc.component';

describe('ConsultaAtcComponent', () => {
  let component: ConsultaAtcComponent;
  let fixture: ComponentFixture<ConsultaAtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaAtcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
