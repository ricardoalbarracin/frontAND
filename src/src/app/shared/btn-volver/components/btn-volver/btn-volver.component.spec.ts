import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnVolverComponent } from './btn-volver.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BtnVolverComponent', () => {
  let component: BtnVolverComponent;
  let fixture: ComponentFixture<BtnVolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnVolverComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnVolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
