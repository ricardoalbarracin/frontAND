import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TramiteDetailComponent } from '@shared/tramite-detail/components/tramite-detail/tramite-detail.component';
import { ListaOpcionesComponent } from './lista-opciones.component';

describe('ListaOpcionesComponent', () => {
  let component: ListaOpcionesComponent;
  let fixture: ComponentFixture<ListaOpcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaOpcionesComponent,ListaOpcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
