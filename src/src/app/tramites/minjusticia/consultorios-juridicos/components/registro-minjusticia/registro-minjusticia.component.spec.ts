import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMinjusticiaComponent } from './registro-minjusticia.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RegistroMinjusticiaComponent', () => {
  let component: RegistroMinjusticiaComponent;
  let fixture: ComponentFixture<RegistroMinjusticiaComponent>;
  let itemDebug: DebugElement;
  let itemElement : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroMinjusticiaComponent ],
      imports: [ 
        NgbModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroMinjusticiaComponent);
    component = fixture.componentInstance;
    itemDebug = fixture.debugElement;
    itemElement = itemDebug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Debería mostrar validación de formulario incorrecto", () => {
    component.ngOnInit();

    let btn = itemDebug.query(By.css("#save-user"));
    btn.triggerEventHandler("click", null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();      
      let errorDiv = itemElement.querySelector("#error-message");

      expect(errorDiv).toBeTruthy();
    });
  });
});
