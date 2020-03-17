import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PreguntaRadioComponent } from './pregunta-radio.component';

describe('PreguntaRadioComponent', () => {
  let component: PreguntaRadioComponent;
  let fixture: ComponentFixture<PreguntaRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
