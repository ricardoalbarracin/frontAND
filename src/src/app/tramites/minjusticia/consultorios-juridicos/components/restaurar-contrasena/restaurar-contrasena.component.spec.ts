import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarContrasenaComponent } from './restaurar-contrasena.component';

describe('RestaurarContrasenaComponent', () => {
  let component: RestaurarContrasenaComponent;
  let fixture: ComponentFixture<RestaurarContrasenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurarContrasenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
