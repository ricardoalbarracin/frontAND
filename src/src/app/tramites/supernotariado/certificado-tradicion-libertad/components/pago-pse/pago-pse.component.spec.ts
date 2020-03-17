import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPseComponent } from './pago-pse.component';

describe('PagoPseComponent', () => {
  let component: PagoPseComponent;
  let fixture: ComponentFixture<PagoPseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoPseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoPseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
