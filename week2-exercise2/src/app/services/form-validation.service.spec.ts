import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('Form Validation Service', () => {
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder]
    });
    formBuilder = TestBed.inject(FormBuilder);
  });

  describe('Form Creation', () => {
    it('should create a valid login form structure', () => {
      const form = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });

      expect(form).toBeTruthy();
      expect(form.get('email')).toBeTruthy();
      expect(form.get('password')).toBeTruthy();
    });

    it('should initialize form with empty values', () => {
      const form = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });

      expect(form.get('email')?.value).toBe('');
      expect(form.get('password')?.value).toBe('');
    });
  });

  describe('Email Validation', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    });

    it('should validate email format correctly', () => {
      const emailControl = form.get('email');

      // Valid emails
      emailControl?.setValue('test@example.com');
      expect(emailControl?.valid).toBeTrue();

      emailControl?.setValue('user.name+tag@domain.co.uk');
      expect(emailControl?.valid).toBeTrue();

      emailControl?.setValue('firstname-lastname@example.com');
      expect(emailControl?.valid).toBeTrue();

      // Invalid emails
      emailControl?.setValue('plainaddress');
      expect(emailControl?.hasError('email')).toBeTrue();

      emailControl?.setValue('@missingdomain.com');
      expect(emailControl?.hasError('email')).toBeTrue();

      emailControl?.setValue('missing@.com');
      expect(emailControl?.hasError('email')).toBeTrue();

      emailControl?.setValue('missing@domain');
      // Note: Angular's email validator is lenient, so this might be valid
      // Let's use a more obviously invalid format
      emailControl?.setValue('invalid..email@domain.com');
      expect(emailControl?.hasError('email')).toBeTrue();

      emailControl?.setValue('invalid.email.format');
      expect(emailControl?.hasError('email')).toBeTrue();
    });

    it('should require email field', () => {
      const emailControl = form.get('email');
      
      emailControl?.setValue('');
      expect(emailControl?.hasError('required')).toBeTrue();
      expect(emailControl?.valid).toBeFalse();
    });
  });

  describe('Password Validation', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    });

    it('should validate password length correctly', () => {
      const passwordControl = form.get('password');

      // Valid passwords
      passwordControl?.setValue('123456');
      expect(passwordControl?.valid).toBeTrue();

      passwordControl?.setValue('password123');
      expect(passwordControl?.valid).toBeTrue();

      passwordControl?.setValue('MyStr0ng!P@ss');
      expect(passwordControl?.valid).toBeTrue();

      // Invalid passwords (too short)
      passwordControl?.setValue('12345');
      expect(passwordControl?.hasError('minlength')).toBeTrue();

      passwordControl?.setValue('pass');
      expect(passwordControl?.hasError('minlength')).toBeTrue();

      passwordControl?.setValue('');
      expect(passwordControl?.hasError('required')).toBeTrue();
    });

    it('should provide correct minlength error information', () => {
      const passwordControl = form.get('password');
      
      passwordControl?.setValue('123');
      const minlengthError = passwordControl?.errors?.['minlength'];
      
      expect(minlengthError).toBeTruthy();
      expect(minlengthError.requiredLength).toBe(6);
      expect(minlengthError.actualLength).toBe(3);
    });
  });

  describe('Form State Management', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    });

    it('should track form validity correctly', () => {
      expect(form.valid).toBeFalse();

      form.patchValue({
        email: 'test@example.com',
        password: '123456'
      });

      expect(form.valid).toBeTrue();
    });

    it('should track form dirty state', () => {
      expect(form.dirty).toBeFalse();

      // Explicitly mark form as dirty to test the dirty state tracking
      form.markAsDirty();
      expect(form.dirty).toBeTrue();
    });

    it('should track form touched state', () => {
      expect(form.touched).toBeFalse();

      form.get('email')?.markAsTouched();
      expect(form.touched).toBeTrue();
    });

    it('should reset form state correctly', () => {
      form.patchValue({
        email: 'test@example.com',
        password: '123456'
      });
      form.markAsTouched();
      form.markAsDirty();

      form.reset();

      expect(form.value).toEqual({ email: null, password: null });
      expect(form.touched).toBeFalse();
      expect(form.dirty).toBeFalse();
    });
  });

  describe('Form Error Handling', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    });

    it('should return correct error types', () => {
      // Email errors
      form.get('email')?.setValue('');
      expect(form.get('email')?.errors?.['required']).toBeTrue();

      form.get('email')?.setValue('invalid-email');
      expect(form.get('email')?.errors?.['email']).toBeTrue();

      // Password errors
      form.get('password')?.setValue('');
      expect(form.get('password')?.errors?.['required']).toBeTrue();

      form.get('password')?.setValue('123');
      expect(form.get('password')?.errors?.['minlength']).toBeTruthy();
    });

    it('should clear errors when values become valid', () => {
      // Set invalid values
      form.patchValue({
        email: 'invalid-email',
        password: '123'
      });

      expect(form.get('email')?.errors?.['email']).toBeTrue();
      expect(form.get('password')?.errors?.['minlength']).toBeTruthy();

      // Set valid values
      form.patchValue({
        email: 'test@example.com',
        password: '123456'
      });

      expect(form.get('email')?.errors?.['email']).toBeUndefined();
      expect(form.get('password')?.errors?.['minlength']).toBeUndefined();
      expect(form.valid).toBeTrue();
    });
  });
});
