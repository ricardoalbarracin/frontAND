import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMinjusticiaComponent } from './login-minjusticia.component';

describe('LoginMinjusticiaComponent', () => {
  let component: LoginMinjusticiaComponent;
  let fixture: ComponentFixture<LoginMinjusticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMinjusticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMinjusticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
