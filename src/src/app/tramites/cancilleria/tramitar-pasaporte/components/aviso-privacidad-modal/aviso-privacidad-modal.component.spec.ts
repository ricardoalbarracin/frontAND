import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoPrivacidadModalComponent } from './aviso-privacidad-modal.component';

describe('AvisoPrivacidadModalComponent', () => {
  let component: AvisoPrivacidadModalComponent;
  let fixture: ComponentFixture<AvisoPrivacidadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoPrivacidadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoPrivacidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
