import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinjusticiaComponent } from './minjusticia.component';
import { TramiteDetailComponent } from '@shared/tramite-detail/components/tramite-detail/tramite-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MinjusticiaComponent', () => {
  let component: MinjusticiaComponent;
  let fixture: ComponentFixture<MinjusticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinjusticiaComponent, TramiteDetailComponent ],
      imports: [
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinjusticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
