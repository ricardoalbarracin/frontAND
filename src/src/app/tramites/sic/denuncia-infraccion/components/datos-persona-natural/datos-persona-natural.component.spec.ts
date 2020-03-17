import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPersonaNaturalComponent } from './datos-persona-natural.component';

describe('DatosPersonaNaturalComponent', () => {
  let component: DatosPersonaNaturalComponent;
  let fixture: ComponentFixture<DatosPersonaNaturalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPersonaNaturalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPersonaNaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
