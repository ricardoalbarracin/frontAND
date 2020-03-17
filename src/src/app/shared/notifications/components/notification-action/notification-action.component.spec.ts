import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationActionComponent } from './notification-action.component';

describe('NotificationActionComponent', () => {
  let component: NotificationActionComponent;
  let fixture: ComponentFixture<NotificationActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
