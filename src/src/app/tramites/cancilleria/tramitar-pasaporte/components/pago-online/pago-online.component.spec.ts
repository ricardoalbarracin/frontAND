import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoOnlineComponent } from './pago-online.component';

describe('PagoOnlineComponent', () => {
  let component: PagoOnlineComponent;
  let fixture: ComponentFixture<PagoOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
