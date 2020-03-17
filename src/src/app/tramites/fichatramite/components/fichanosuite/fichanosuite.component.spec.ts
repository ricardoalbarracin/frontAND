import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaNoSuiteComponent } from './fichanosuite.component';

describe('FichaNoSuiteComponent', () => {
  let component: FichaNoSuiteComponent;
  let fixture: ComponentFixture<FichaNoSuiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaNoSuiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaNoSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
