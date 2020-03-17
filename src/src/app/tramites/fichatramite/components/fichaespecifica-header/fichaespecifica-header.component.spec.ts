import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaespecificaHeaderComponent } from './fichaespecifica-header.component';

describe('FichaespecificaHeaderComponent', () => {
  let component: FichaespecificaHeaderComponent;
  let fixture: ComponentFixture<FichaespecificaHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaespecificaHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaespecificaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
