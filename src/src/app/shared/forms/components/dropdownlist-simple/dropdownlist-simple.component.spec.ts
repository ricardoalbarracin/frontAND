import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownlistSimpleComponent } from './dropdownlist-simple.component';

describe('DropdownlistSimpleComponent', () => {
  let component: DropdownlistSimpleComponent;
  let fixture: ComponentFixture<DropdownlistSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownlistSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownlistSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
