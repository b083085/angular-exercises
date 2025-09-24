import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RegistrationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Registration Form' title`, () => {
    const title = compiled.querySelector('h1')?.textContent;
    expect(title).toContain('Registration Form');
  });

  it('should render the registration component', () => {
    const registrationComponent = compiled.querySelector('app-registration');
    expect(registrationComponent).toBeTruthy();
  });

  it('should have the main app container', () => {
    const container = compiled.querySelector('.app-container');
    expect(container).toBeTruthy();
  });
});
