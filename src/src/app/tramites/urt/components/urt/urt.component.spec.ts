import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TramiteDetailComponent } from '@shared/tramite-detail/components/tramite-detail/tramite-detail.component';
import { UrtComponent } from './urt.component';

describe('UrtComponent', () => {
  let component: UrtComponent;
  let fixture: ComponentFixture<UrtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrtComponent,TramiteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
