import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEspecificaComponent } from './fichaespecifica.component';

describe('FichaEspecificaComponent', () => {
  let component: FichaEspecificaComponent;
  let fixture: ComponentFixture<FichaEspecificaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaEspecificaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaEspecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
