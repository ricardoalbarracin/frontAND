import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroNuevoUsuarioComponent } from './registro-nuevo-usuario.component';

describe('RegistroNuevoUsuarioComponent', () => {
  let component: RegistroNuevoUsuarioComponent;
  let fixture: ComponentFixture<RegistroNuevoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroNuevoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroNuevoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
