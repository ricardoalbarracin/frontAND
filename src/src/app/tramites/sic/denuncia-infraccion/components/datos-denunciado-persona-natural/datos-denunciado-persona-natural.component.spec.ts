import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDenunciadoPersonaNaturalComponent } from './datos-denunciado-persona-natural.component';

describe('DatosDenunciadoPersonaNaturalComponent', () => {
  let component: DatosDenunciadoPersonaNaturalComponent;
  let fixture: ComponentFixture<DatosDenunciadoPersonaNaturalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDenunciadoPersonaNaturalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDenunciadoPersonaNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
