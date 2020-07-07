import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionessindicalesComponent } from './organizacionessindicales.component';

describe('OrganizacionessindicalesComponent', () => {
  let component: OrganizacionessindicalesComponent;
  let fixture: ComponentFixture<OrganizacionessindicalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizacionessindicalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizacionessindicalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
