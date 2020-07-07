import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecciontramiteComponent } from './selecciontramite.component';

describe('SelecciontramiteComponent', () => {
  let component: SelecciontramiteComponent;
  let fixture: ComponentFixture<SelecciontramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecciontramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecciontramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
