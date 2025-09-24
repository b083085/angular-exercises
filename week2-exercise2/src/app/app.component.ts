import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.setupRealTimeValidation();
  }

  get f() { return this.loginForm.controls; }

  private setupRealTimeValidation() {
    this.loginForm.get('email')?.valueChanges.subscribe(() => {
      if (this.loginForm.get('email')?.value && !this.loginForm.get('email')?.touched) {
        this.loginForm.get('email')?.markAsTouched();
      }
    });

    this.loginForm.get('password')?.valueChanges.subscribe(() => {
      if (this.loginForm.get('password')?.value && !this.loginForm.get('password')?.touched) {
        this.loginForm.get('password')?.markAsTouched();
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      console.log('Form submitted successfully!', this.loginForm.value);
      alert('Login successful! Check console for form data.');
    } else {
      console.log('Form has validation errors');
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  getFormErrors() {
    const errors: any = {};
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }
}
