import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoNumeroPinComponent } from './info-numero-pin.component';

describe('InfoNumeroPinComponent', () => {
  let component: InfoNumeroPinComponent;
  let fixture: ComponentFixture<InfoNumeroPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoNumeroPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoNumeroPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
