import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TramiteDetailComponent } from '@shared/tramite-detail/components/tramite-detail/tramite-detail.component';
import { InvimaComponent } from './invima.component';

describe('InvimaComponent', () => {
  let component: InvimaComponent;
  let fixture: ComponentFixture<InvimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvimaComponent,TramiteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
