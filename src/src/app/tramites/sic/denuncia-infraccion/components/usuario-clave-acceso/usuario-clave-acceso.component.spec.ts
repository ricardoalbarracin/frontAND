import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioClaveAccesoComponent } from './usuario-clave-acceso.component';

describe('UsuarioClaveAccesoComponent', () => {
  let component: UsuarioClaveAccesoComponent;
  let fixture: ComponentFixture<UsuarioClaveAccesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioClaveAccesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioClaveAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
