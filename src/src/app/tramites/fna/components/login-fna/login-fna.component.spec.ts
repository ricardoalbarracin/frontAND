import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFnaComponent } from './login-fna.component';

describe('LoginFnaComponent', () => {
  let component: LoginFnaComponent;
  let fixture: ComponentFixture<LoginFnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
