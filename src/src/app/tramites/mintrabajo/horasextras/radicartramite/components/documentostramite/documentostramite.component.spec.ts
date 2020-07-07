import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentostramiteComponent } from './documentostramite.component';

describe('DocumentostramiteComponent', () => {
  let component: DocumentostramiteComponent;
  let fixture: ComponentFixture<DocumentostramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentostramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentostramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
