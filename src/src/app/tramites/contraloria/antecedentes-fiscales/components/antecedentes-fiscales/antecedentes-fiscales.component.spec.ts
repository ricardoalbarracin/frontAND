import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesFiscalesComponent } from './antecedentes-fiscales.component';

describe('AntecedentesFiscalesComponent', () => {
  let component: AntecedentesFiscalesComponent;
  let fixture: ComponentFixture<AntecedentesFiscalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntecedentesFiscalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesFiscalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
