import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboPagoCreditoComponent } from './recibo-pago-credito.component';

describe('ReciboPagoCreditoComponent', () => {
  let component: ReciboPagoCreditoComponent;
  let fixture: ComponentFixture<ReciboPagoCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciboPagoCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboPagoCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
