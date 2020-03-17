import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosModalComponent } from './recursos-modal.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('RegistroMinjusticiaTerminosComponent', () => {
  let component: RecursosModalComponent;
  let fixture: ComponentFixture<RecursosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosModalComponent ],
      imports: [
        NgbModule
      ],
      providers: [ NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
