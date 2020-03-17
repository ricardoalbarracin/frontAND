import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEstandarComponent } from './fichaestandar.component';

describe('FichaEstandarComponent', () => {
  let component: FichaEstandarComponent;
  let fixture: ComponentFixture<FichaEstandarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaEstandarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEstandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
