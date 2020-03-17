import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaPasaporteModalComponent } from './ayuda-pasaporte-modal.component';

describe('AyudaPasaporteModalComponent', () => {
  let component: AyudaPasaporteModalComponent;
  let fixture: ComponentFixture<AyudaPasaporteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyudaPasaporteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaPasaporteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
