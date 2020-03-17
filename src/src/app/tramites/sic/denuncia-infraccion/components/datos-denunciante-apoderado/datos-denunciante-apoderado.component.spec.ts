import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDenuncianteApoderadoComponent } from './datos-denunciante-apoderado.component';

describe('DatosDenuncianteApoderadoComponent', () => {
  let component: DatosDenuncianteApoderadoComponent;
  let fixture: ComponentFixture<DatosDenuncianteApoderadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDenuncianteApoderadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDenuncianteApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
