import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteSicComponent } from './alerte-sic.component';

describe('AlerteSicComponent', () => {
  let component: AlerteSicComponent;
  let fixture: ComponentFixture<AlerteSicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlerteSicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerteSicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
