import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteregistradoComponent } from './tramiteregistrado.component';

describe('TramiteregistradoComponent', () => {
  let component: TramiteregistradoComponent;
  let fixture: ComponentFixture<TramiteregistradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramiteregistradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramiteregistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
