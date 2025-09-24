import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgControl, NgModel } from '@angular/forms';
import { User, USER_ROLES } from '../models/user.model';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = {
    name: '',
    email: '',
    password: '',
    role: 'user'
  };

  roles = USER_ROLES;
  submitted = false;

  get selectedRoleName(): string {
    const role = this.roles.find(r => r.id === this.user.role);
    return role ? role.name : '';
  }

  isFieldInvalid(control: NgModel | null): boolean {
    if (!control || !control.control) return false;
    const { invalid, dirty, touched } = control.control;
    return invalid && (dirty || touched);
  }

  getErrorMessage(control: NgModel | null): string {
    if (!control || !control.errors) return '';
    
    if (control.errors['required']) {
      return 'This field is required';
    } else if (control.errors['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
    } else if (control.errors['email']) {
      return 'Please enter a valid email address';
    }
    
    return 'Invalid field';
  }

  onSubmit(form: NgForm) {
    Object.keys(form.controls).forEach(key => {
      const control = form.controls[key];
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (form.valid) {
      console.log('Form submitted:', this.user);
      this.submitted = true;
    } else {
      console.log('Form is invalid');
    }
  }

  onNewRegistration() {
    this.submitted = false;

    this.user = {
      name: '',
      email: '',
      password: '',
      role: 'user'
    };
  }
}
