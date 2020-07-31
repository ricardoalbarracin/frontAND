import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarExportacionComponent } from './autorizar-exportacion.component';

describe('AutorizarExportacionComponent', () => {
  let component: AutorizarExportacionComponent;
  let fixture: ComponentFixture<AutorizarExportacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizarExportacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizarExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
