import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumbComponent } from './bread-crumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WordLimitPipe } from '@shared/pipes/word-limit/word-limit.pipe';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

describe('BreadCrumbComponent', () => {
  let component: BreadCrumbComponent;
  let fixture: ComponentFixture<BreadCrumbComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadCrumbComponent, WordLimitPipe ],
      imports: [ 
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberá crearse', () => {
    expect(component).toBeTruthy();
  });

  it("Deberá cargar el botón de home", () => {
    const breadDebug: DebugElement = fixture.debugElement;
    const breadElement : HTMLElement = breadDebug.nativeElement;

    const homeElement = breadElement.querySelectorAll(".breadcrumb-home"); 
    expect(homeElement.length).toEqual(1);
  });
});
