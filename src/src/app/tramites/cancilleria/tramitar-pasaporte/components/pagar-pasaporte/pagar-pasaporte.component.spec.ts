import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarPasaporteComponent } from './pagar-pasaporte.component';

describe('PagarPasaporteComponent', () => {
  let component: PagarPasaporteComponent;
  let fixture: ComponentFixture<PagarPasaporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarPasaporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarPasaporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
