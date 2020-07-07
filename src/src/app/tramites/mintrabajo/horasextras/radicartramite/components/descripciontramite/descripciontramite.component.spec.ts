import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripciontramiteComponent } from './descripciontramite.component';

describe('DescripciontramiteComponent', () => {
  let component: DescripciontramiteComponent;
  let fixture: ComponentFixture<DescripciontramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescripciontramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripciontramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
