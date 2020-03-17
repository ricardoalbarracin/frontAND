import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { BreadCrumbComponent } from '@shared/bread-crumb/components/bread-crumb/bread-crumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WordLimitPipe } from '@shared/pipes/word-limit/word-limit.pipe';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent, BreadCrumbComponent, WordLimitPipe ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
