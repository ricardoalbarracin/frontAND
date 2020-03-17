import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaespecificaAccordionComponent } from './fichaespecifica-accordion.component';

describe('FichaespecificaAccordionComponent', () => {
  let component: FichaespecificaAccordionComponent;
  let fixture: ComponentFixture<FichaespecificaAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaespecificaAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaespecificaAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
