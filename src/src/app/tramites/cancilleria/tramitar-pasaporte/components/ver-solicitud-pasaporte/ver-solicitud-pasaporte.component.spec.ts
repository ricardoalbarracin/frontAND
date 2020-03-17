import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSolicitudPasaporteComponent } from './ver-solicitud-pasaporte.component';

describe('VerSolicitudPasaporteComponent', () => {
  let component: VerSolicitudPasaporteComponent;
  let fixture: ComponentFixture<VerSolicitudPasaporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerSolicitudPasaporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSolicitudPasaporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
