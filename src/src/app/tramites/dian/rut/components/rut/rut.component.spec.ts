import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutComponent } from './rut.component';

describe('RutComponent', () => {
  let component: RutComponent;
  let fixture: ComponentFixture<RutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
