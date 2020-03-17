import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarPasaporteComponent } from './solicitar-pasaporte.component';

describe('SolicitarPasaporteComponent', () => {
  let component: SolicitarPasaporteComponent;
  let fixture: ComponentFixture<SolicitarPasaporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarPasaporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarPasaporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
