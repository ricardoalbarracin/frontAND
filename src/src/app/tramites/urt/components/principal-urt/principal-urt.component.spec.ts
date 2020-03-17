import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalUrtComponent } from './principal-urt.component';

describe('PrincipalUrlComponent', () => {
  let component: PrincipalUrtComponent;
  let fixture: ComponentFixture<PrincipalUrtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalUrtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalUrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
