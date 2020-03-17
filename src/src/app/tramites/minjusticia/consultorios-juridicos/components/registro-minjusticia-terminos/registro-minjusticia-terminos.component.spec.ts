import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMinjusticiaTerminosComponent } from './registro-minjusticia-terminos.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('RegistroMinjusticiaTerminosComponent', () => {
  let component: RegistroMinjusticiaTerminosComponent;
  let fixture: ComponentFixture<RegistroMinjusticiaTerminosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroMinjusticiaTerminosComponent ],
      imports: [
        NgbModule
      ], 
      providers: [ NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroMinjusticiaTerminosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
