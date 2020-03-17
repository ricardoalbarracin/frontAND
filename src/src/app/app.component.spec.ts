import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TemplateComponent } from './core/template/template.component';
import { HeaderComponent } from './core/template/components/header/header.component';
import { MainComponent } from './core/template/components/main/main.component';
import { FooterComponent } from './core/template/components/footer/footer.component';
import { BreadCrumbComponent } from '@shared/bread-crumb/components/bread-crumb/bread-crumb.component';
import { WordLimitPipe } from '@shared/pipes/word-limit/word-limit.pipe';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        TemplateComponent,
        HeaderComponent,
        MainComponent,
        FooterComponent,
        BreadCrumbComponent,
        WordLimitPipe
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
