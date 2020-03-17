import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostillaComponent } from './apostilla.component';

describe('ApostillaComponent', () => {
  let component: ApostillaComponent;
  let fixture: ComponentFixture<ApostillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApostillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApostillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
