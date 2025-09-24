import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let compiled: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, RegistrationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default user values', () => {
    expect(component.user).toEqual({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
  });

  it('should have all required form fields', () => {
    const nameInput = compiled.querySelector('input[name="name"]');
    const emailInput = compiled.querySelector('input[type="email"]');
    const passwordInput = compiled.querySelector('input[type="password"]');
    const roleSelect = compiled.querySelector('select');
    const submitButton = compiled.querySelector('button[type="submit"]');

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(roleSelect).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should validate required fields', () => {
    const form = debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    expect(form.valid).toBeFalsy();
    
    component.user = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    };
    fixture.detectChanges();
    
    expect(form.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailInput = debugElement.query(By.css('input[type="email"]')).nativeElement;
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const form = debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    const emailControl = form.controls['email'];
    expect(emailControl.valid).toBeFalsy();
    expect(emailControl.errors?.['email']).toBeTruthy();
  });

  it('should validate password minimum length', () => {
    const passwordInput = debugElement.query(By.css('input[type="password"]')).nativeElement;
    passwordInput.value = 'short';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    const form = debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    const passwordControl = form.controls['password'];
    expect(passwordControl.valid).toBeFalsy();
    expect(passwordControl.errors?.['minlength']).toBeTruthy();
  });

  it('should submit the form when valid', fakeAsync(() => {
    spyOn(console, 'log');
    
    component.user = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    };
    
    fixture.detectChanges();
    
    const form = debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    tick();
    
    expect(component.submitted).toBeTrue();
    expect(console.log).toHaveBeenCalledWith('Form submitted:', component.user);
  }));

  it('should not submit the form when invalid', () => {
    spyOn(console, 'log');
    
    component.user = {
      name: '',
      email: '',
      password: '',
      role: 'user'
    };
    
    fixture.detectChanges();
    
    const form = debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    
    expect(component.submitted).toBeFalse();
    expect(console.log).toHaveBeenCalledWith('Form is invalid');
  });

  it('should reset the form with onNewRegistration', () => {
    component.submitted = true;
    component.user = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'admin'
    };
    
    component.onNewRegistration();
    
    expect(component.submitted).toBeFalse();
    expect(component.user).toEqual({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
  });
});
