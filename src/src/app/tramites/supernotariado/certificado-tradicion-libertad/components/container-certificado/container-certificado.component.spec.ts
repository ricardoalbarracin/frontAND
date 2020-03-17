import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerCertificadoComponent } from './container-certificado.component';

describe('ContainerCertificadoComponent', () => {
  let component: ContainerCertificadoComponent;
  let fixture: ComponentFixture<ContainerCertificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerCertificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
