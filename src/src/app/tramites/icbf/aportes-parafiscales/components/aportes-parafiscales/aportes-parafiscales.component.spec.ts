/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AportesParafiscalesComponent } from './aportes-parafiscales.component';

describe('AportesParafiscalesComponent', () => {
  let component: AportesParafiscalesComponent;
  let fixture: ComponentFixture<AportesParafiscalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AportesParafiscalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AportesParafiscalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
