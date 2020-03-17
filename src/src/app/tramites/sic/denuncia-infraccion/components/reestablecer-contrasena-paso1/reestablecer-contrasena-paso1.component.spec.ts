import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReestablecerContrasenaPaso1Component } from './reestablecer-contrasena-paso1.component';

describe('ReestablecerContrasenaPaso1Component', () => {
  let component: ReestablecerContrasenaPaso1Component;
  let fixture: ComponentFixture<ReestablecerContrasenaPaso1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReestablecerContrasenaPaso1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReestablecerContrasenaPaso1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
