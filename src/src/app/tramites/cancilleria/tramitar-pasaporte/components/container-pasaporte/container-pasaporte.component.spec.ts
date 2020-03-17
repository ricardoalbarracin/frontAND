import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPasaporteComponent } from './container-pasaporte.component';

describe('ContainerPasaporteComponent', () => {
  let component: ContainerPasaporteComponent;
  let fixture: ComponentFixture<ContainerPasaporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerPasaporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerPasaporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
