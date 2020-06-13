import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosremitenteNaturalComponent } from './datosremitente-natural.component';

describe('DatosremitenteNaturalComponent', () => {
  let component: DatosremitenteNaturalComponent;
  let fixture: ComponentFixture<DatosremitenteNaturalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosremitenteNaturalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosremitenteNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
