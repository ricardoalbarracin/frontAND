/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SenaComponent } from './sena.component';

describe('SenaComponent', () => {
  let component: SenaComponent;
  let fixture: ComponentFixture<SenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
