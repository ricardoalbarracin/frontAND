import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosremitenteComponent } from './datosremitente.component';

describe('DatosremitenteComponent', () => {
  let component: DatosremitenteComponent;
  let fixture: ComponentFixture<DatosremitenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosremitenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosremitenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
