import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDenunciadoComponent } from './datos-denunciado.component';

describe('DatosDenunciadoComponent', () => {
  let component: DatosDenunciadoComponent;
  let fixture: ComponentFixture<DatosDenunciadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDenunciadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDenunciadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
