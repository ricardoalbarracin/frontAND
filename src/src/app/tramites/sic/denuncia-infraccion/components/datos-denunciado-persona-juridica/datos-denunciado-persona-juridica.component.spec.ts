import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDenunciadoPersonaJuridicaComponent } from './datos-denunciado-persona-juridica.component';

describe('DatosDenunciadoPersonaJuridicaComponent', () => {
  let component: DatosDenunciadoPersonaJuridicaComponent;
  let fixture: ComponentFixture<DatosDenunciadoPersonaJuridicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDenunciadoPersonaJuridicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDenunciadoPersonaJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
