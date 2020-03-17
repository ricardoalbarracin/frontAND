import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContrasenaComponent } from './recuperar-contrasena.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RecuperarContrasenaComponent', () => {
  let component: RecuperarContrasenaComponent;
  let fixture: ComponentFixture<RecuperarContrasenaComponent>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let itemDebug: DebugElement;
  let itemElement : HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarContrasenaComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContrasenaComponent);
    component = fixture.componentInstance;
    itemDebug = fixture.debugElement;
    itemElement = itemDebug.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Debería mostrar error por campo de Usuario vacio", () => {
    component.ngOnInit();

    let btn = itemElement.querySelector("button");
    btn.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let errorDiv = itemElement.querySelector("#error-user-invalid");
      expect(errorDiv).toBeTruthy();
    });
  });

  it("Debería cargar el formulario de cambio de contraseña al ingresar un nombre de usuario", () => {
    component.ngOnInit();
    component.user.setValue({ key: "Carlos" });
    fixture.detectChanges();      

    let btn = itemElement.querySelector("button");
    btn.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();      
      let div = itemElement.querySelector("#restaurar-contrasena-div");

      expect(div).toBeTruthy();
    });
  });

  it("Debería mostrar error por campos de contraseña vacío", () => { 
    component.ngOnInit();
    component.user.setValue({ key: "Batman" });
    fixture.detectChanges();      

    let btn = itemElement.querySelector("button");
    btn.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();      
      
      let btn = itemElement.querySelector("button");
      btn.click();

      fixture.whenStable().then(() => {
        fixture.detectChanges();      
        let errorDiv = itemElement.querySelector("#error-password-invalid");
        expect(errorDiv).toBeTruthy();
      });
    });
  });
});
