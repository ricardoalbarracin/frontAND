import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPasaporteComponent } from './index-pasaporte.component';

describe('IndexPasaporteComponent', () => {
  let component: IndexPasaporteComponent;
  let fixture: ComponentFixture<IndexPasaporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPasaporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPasaporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
