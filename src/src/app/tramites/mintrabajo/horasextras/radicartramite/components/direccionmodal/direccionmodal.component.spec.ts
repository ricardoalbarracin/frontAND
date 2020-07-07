import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionmodalComponent } from './direccionmodal.component';

describe('DireccionmodalComponent', () => {
  let component: DireccionmodalComponent;
  let fixture: ComponentFixture<DireccionmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
