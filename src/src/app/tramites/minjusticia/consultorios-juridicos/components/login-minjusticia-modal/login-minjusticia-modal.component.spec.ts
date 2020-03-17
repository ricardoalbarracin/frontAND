import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMinjusticiaModalComponent } from './login-minjusticia-modal.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginMinjusticiaModalComponent', () => {
  let component: LoginMinjusticiaModalComponent;
  let fixture: ComponentFixture<LoginMinjusticiaModalComponent>;
  let itemDebug: DebugElement;
  let itemElement : HTMLElement;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMinjusticiaModalComponent ],
      imports: [
        NgbModule,
        ReactiveFormsModule
      ],
      providers: [
        NgbActiveModal,
        { provide: Router, useValue: routerSpy }
      ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMinjusticiaModalComponent);
    component = fixture.componentInstance;
    itemDebug = fixture.debugElement;
    itemElement = itemDebug.nativeElement;
    router = TestBed.get(Router);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Debería validar el formulario y mostrar el mensaje de error", () => { 
    component.ngOnInit();

    let btn = itemDebug.query(By.css("#login-btn"));
    btn.triggerEventHandler("click", null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();      
      let errorDiv = itemElement.querySelector("#minjusticia-login-container #error-message");

      expect(errorDiv).toBeTruthy();
    });
  });

  it("Debería redirigir a la vista de registro de personas", () => {
    component.ngOnInit();
    const spy = router.navigate as jasmine.Spy;

    let click = itemDebug.query(By.css("#sign-in-btn"));
    click.triggerEventHandler("click", null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const navArgs = spy.calls.first().args[0];
      expect(navArgs[0]).toBe("/minjusticia/registro"); 
    });
  });


  it("Debería redirigir a la vista de recuperación de contraseña", () => {
    component.ngOnInit();
    const spy = router.navigate as jasmine.Spy;

    let clickA = itemDebug.query(By.css("#forgot-pass-btn"));
    clickA.triggerEventHandler("click", null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const navArgs = spy.calls.first().args[0];
      expect(navArgs[0]).toBe("/minjusticia/recuperarContrasena"); 
    });
  });

  it("Mostrar contraseña: Debería cambiar el tipo de elemento de contraseña a input", () => {
    component.ngOnInit();

    let check = itemDebug.query(By.css("#showPassword"));
    check.triggerEventHandler("click", null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();      
      let errorDiv = itemElement.querySelector("#password");
      const type = errorDiv.getAttribute("type");

      expect(type).toEqual("input");
    });
  });

  //TODO: verificar interacción de formulario diligenciado correctamente
});
