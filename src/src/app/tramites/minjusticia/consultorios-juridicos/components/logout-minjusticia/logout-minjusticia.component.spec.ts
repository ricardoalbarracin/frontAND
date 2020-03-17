import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutMinjusticiaComponent } from './logout-minjusticia.component';

describe('LogoutMinjusticiaComponent', () => {
  let component: LogoutMinjusticiaComponent;
  let fixture: ComponentFixture<LogoutMinjusticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutMinjusticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutMinjusticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
