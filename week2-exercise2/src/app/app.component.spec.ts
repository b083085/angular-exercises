import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize loginForm with empty values', () => {
      expect(component.loginForm.get('email')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
    });

    it('should have submitted property initialized as false', () => {
      expect(component.submitted).toBeFalse();
    });

    it('should have form controls properly configured', () => {
      const emailControl = component.loginForm.get('email');
      const passwordControl = component.loginForm.get('password');

      expect(emailControl).toBeTruthy();
      expect(passwordControl).toBeTruthy();
    });

    it('should have form in pristine and untouched state initially', () => {
      expect(component.loginForm.pristine).toBeTrue();
      expect(component.loginForm.untouched).toBeTrue();
    });
  });

  describe('Form Validation', () => {
    it('should be invalid when form is empty', () => {
      expect(component.loginForm.valid).toBeFalse();
    });

    it('should validate email field as required', () => {
      const emailControl = component.loginForm.get('email');
      
      emailControl?.setValue('');
      expect(emailControl?.hasError('required')).toBeTrue();
      expect(emailControl?.valid).toBeFalse();
    });

    it('should validate email format', () => {
      const emailControl = component.loginForm.get('email');
      
      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBeTrue();
      expect(emailControl?.valid).toBeFalse();
    });

    it('should accept valid email format', () => {
      const emailControl = component.loginForm.get('email');
      
      emailControl?.setValue('test@example.com');
      expect(emailControl?.hasError('email')).toBeFalse();
      expect(emailControl?.hasError('required')).toBeFalse();
    });

    it('should validate password field as required', () => {
      const passwordControl = component.loginForm.get('password');
      
      passwordControl?.setValue('');
      expect(passwordControl?.hasError('required')).toBeTrue();
      expect(passwordControl?.valid).toBeFalse();
    });

    it('should validate minimum password length', () => {
      const passwordControl = component.loginForm.get('password');
      
      passwordControl?.setValue('12345');
      expect(passwordControl?.hasError('minlength')).toBeTrue();
      expect(passwordControl?.valid).toBeFalse();
    });

    it('should accept valid password length', () => {
      const passwordControl = component.loginForm.get('password');
      
      passwordControl?.setValue('123456');
      expect(passwordControl?.hasError('minlength')).toBeFalse();
      expect(passwordControl?.hasError('required')).toBeFalse();
    });

    it('should be valid when both fields are properly filled', () => {
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: '123456'
      });

      expect(component.loginForm.valid).toBeTrue();
    });
  });

  describe('Form Submission', () => {
    it('should set submitted to true when onSubmit is called', () => {
      component.onSubmit();
      expect(component.submitted).toBeTrue();
    });

    it('should log form data when form is valid', () => {
      spyOn(console, 'log');
      spyOn(window, 'alert');
      
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: '123456'
      });

      component.onSubmit();

      expect(console.log).toHaveBeenCalledWith('Form submitted successfully!', {
        email: 'test@example.com',
        password: '123456'
      });
      expect(window.alert).toHaveBeenCalledWith('Login successful! Check console for form data.');
    });

    it('should mark all fields as touched when form is invalid', () => {
      spyOn(console, 'log');
      
      component.loginForm.patchValue({
        email: 'invalid-email',
        password: '123'
      });

      component.onSubmit();

      expect(component.loginForm.get('email')?.touched).toBeTrue();
      expect(component.loginForm.get('password')?.touched).toBeTrue();
      expect(console.log).toHaveBeenCalledWith('Form has validation errors');
    });

    it('should not call alert when form is invalid', () => {
      spyOn(window, 'alert');
      
      component.loginForm.patchValue({
        email: 'invalid-email',
        password: '123'
      });

      component.onSubmit();

      expect(window.alert).not.toHaveBeenCalled();
    });
  });

  describe('Form Reset', () => {
    it('should reset form values when onReset is called', () => {
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: '123456'
      });
      component.submitted = true;

      component.onReset();

      expect(component.loginForm.get('email')?.value).toBeNull();
      expect(component.loginForm.get('password')?.value).toBeNull();
      expect(component.submitted).toBeFalse();
    });

    it('should reset form state when onReset is called', () => {
      // Set up initial state
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: '123456'
      });
      component.loginForm.get('email')?.markAsTouched();
      component.loginForm.get('password')?.markAsDirty();
      component.submitted = true;

      component.onReset();

      // After reset, values should be null
      expect(component.loginForm.get('email')?.value).toBeNull();
      expect(component.loginForm.get('password')?.value).toBeNull();
      expect(component.submitted).toBeFalse();
      
      // Form should be pristine and untouched after reset
      expect(component.loginForm.pristine).toBeTrue();
      expect(component.loginForm.untouched).toBeTrue();
    });
  });

  describe('Real-time Validation Setup', () => {
    it('should mark email field as touched when value changes', () => {
      const emailControl = component.loginForm.get('email');
      
      emailControl?.setValue('test@example.com');
      
      expect(emailControl?.touched).toBeTrue();
    });

    it('should mark password field as touched when value changes', () => {
      const passwordControl = component.loginForm.get('password');
      
      passwordControl?.setValue('123456');
      
      expect(passwordControl?.touched).toBeTrue();
    });

    it('should not mark field as touched if it was already touched', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.markAsTouched();
      
      emailControl?.setValue('test@example.com');
      
      expect(emailControl?.touched).toBeTrue();
    });

    it('should not mark field as touched when value is empty', () => {
      const emailControl = component.loginForm.get('email');
      
      emailControl?.setValue('');
      
      expect(emailControl?.touched).toBeFalse();
    });
  });

  describe('Form Error Handling', () => {
    it('should return empty errors object when form has no errors', () => {
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: '123456'
      });

      const errors = component.getFormErrors();
      expect(errors).toEqual({});
    });

    it('should return errors for invalid fields', () => {
      component.loginForm.patchValue({
        email: 'invalid-email',
        password: '123'
      });

      const errors = component.getFormErrors();
      
      expect(errors.email).toBeDefined();
      expect(errors.password).toBeDefined();
      expect(errors.email.email).toBeTrue();
      expect(errors.password.minlength).toBeDefined();
    });

    it('should return only errors for fields that have them', () => {
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: '123'
      });

      const errors = component.getFormErrors();
      
      expect(errors.email).toBeUndefined();
      expect(errors.password).toBeDefined();
      expect(errors.password.minlength).toBeDefined();
    });
  });

  describe('Template Integration', () => {
    it('should render login form', () => {
      const formElement = fixture.debugElement.query(By.css('form'));
      expect(formElement).toBeTruthy();
    });

    it('should render email input field', () => {
      const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
      expect(emailInput).toBeTruthy();
      expect(emailInput.nativeElement.type).toBe('email');
    });

    it('should render password input field', () => {
      const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
      expect(passwordInput).toBeTruthy();
      expect(passwordInput.nativeElement.type).toBe('password');
    });

    it('should render submit button', () => {
      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton).toBeTruthy();
      expect(submitButton.nativeElement.textContent.trim()).toBe('✓ Sign In');
    });

    it('should render reset button', () => {
      const resetButton = fixture.debugElement.query(By.css('button[type="button"]'));
      expect(resetButton).toBeTruthy();
      expect(resetButton.nativeElement.textContent.trim()).toBe('Reset Form');
    });

    it('should disable submit button when form is invalid', () => {
      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton.nativeElement.disabled).toBeTrue();
    });

    it('should enable submit button when form is valid', () => {
      component.loginForm.patchValue({
        email: 'test@example.com',
        password: '123456'
      });
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton.nativeElement.disabled).toBeFalse();
    });

    it('should show validation errors when field is invalid and touched', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('invalid-email');
      emailControl?.markAsTouched();
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.error-message'));
      expect(errorMessage).toBeTruthy();
    });

    it('should show success message when field is valid and touched', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('test@example.com');
      emailControl?.markAsTouched();
      fixture.detectChanges();

      const successMessage = fixture.debugElement.query(By.css('.success-message'));
      expect(successMessage).toBeTruthy();
    });

    it('should show password character count when typing', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('123');
      passwordControl?.markAsTouched();
      fixture.detectChanges();

      const passwordStrength = fixture.debugElement.query(By.css('.password-strength'));
      expect(passwordStrength).toBeTruthy();
      expect(passwordStrength.nativeElement.textContent.trim()).toBe('3/6 characters');
    });
  });

  describe('User Interactions', () => {
    it('should handle form submission', () => {
      spyOn(component, 'onSubmit');
      
      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);
      
      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should handle reset button click', () => {
      spyOn(component, 'onReset');
      
      const resetButton = fixture.debugElement.query(By.css('button[type="button"]'));
      resetButton.triggerEventHandler('click', null);
      
      expect(component.onReset).toHaveBeenCalled();
    });

    it('should update form when user types in email field', () => {
      const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
      
      emailInput.nativeElement.value = 'test@example.com';
      emailInput.nativeElement.dispatchEvent(new Event('input'));
      
      expect(component.loginForm.get('email')?.value).toBe('test@example.com');
    });

    it('should update form when user types in password field', () => {
      const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
      
      passwordInput.nativeElement.value = '123456';
      passwordInput.nativeElement.dispatchEvent(new Event('input'));
      
      expect(component.loginForm.get('password')?.value).toBe('123456');
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for form fields', () => {
      const emailLabel = fixture.debugElement.query(By.css('label[for="email"]'));
      const passwordLabel = fixture.debugElement.query(By.css('label[for="password"]'));
      
      expect(emailLabel).toBeTruthy();
      expect(passwordLabel).toBeTruthy();
    });

    it('should have proper input attributes', () => {
      const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
      const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
      
      expect(emailInput.nativeElement.id).toBe('email');
      expect(passwordInput.nativeElement.id).toBe('password');
    });
  });
});
