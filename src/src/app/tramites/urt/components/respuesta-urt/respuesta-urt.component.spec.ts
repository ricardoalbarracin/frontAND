import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RespuestaUrtComponent } from './respuesta-urt.component';

describe('RespuestaUrtComponent', () => {
  let component: RespuestaUrtComponent;
  let fixture: ComponentFixture<RespuestaUrtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaUrtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaUrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
