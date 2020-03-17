import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAntecedentesComponent } from './buscar-antecedentes.component';

describe('BuscarAntecedentesComponent', () => {
  let component: BuscarAntecedentesComponent;
  let fixture: ComponentFixture<BuscarAntecedentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarAntecedentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarAntecedentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
