import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosAtencionComponent } from './puntos-atencion-modal.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('RegistroMinjusticiaTerminosComponent', () => {
  let component: PuntosAtencionComponent;
  let fixture: ComponentFixture<PuntosAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosAtencionComponent ],
      imports: [
        NgbModule
      ],
      providers: [ NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
