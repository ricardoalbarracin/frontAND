import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarTramiteComponent } from './ingresar-tramite.component';

describe('IngresarTramiteComponent', () => {
  let component: IngresarTramiteComponent;
  let fixture: ComponentFixture<IngresarTramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarTramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
