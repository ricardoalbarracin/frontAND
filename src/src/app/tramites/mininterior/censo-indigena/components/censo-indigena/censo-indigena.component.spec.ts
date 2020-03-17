import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CensoIndigenaComponent } from './censo-indigena.component';

describe('CensoIndigenaComponent', () => {
  let component: CensoIndigenaComponent;
  let fixture: ComponentFixture<CensoIndigenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CensoIndigenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CensoIndigenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
