import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductaAlertaComponent } from './conducta-alerta.component';

describe('ConductaAlertaComponent', () => {
  let component: ConductaAlertaComponent;
  let fixture: ComponentFixture<ConductaAlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConductaAlertaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductaAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
