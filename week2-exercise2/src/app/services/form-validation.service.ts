import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  /**
   * Get all validation errors from a form
   * @param form The form group to extract errors from
   * @returns Object containing field names and their errors
   */
  getFormErrors(form: FormGroup): { [key: string]: any } {
    const errors: { [key: string]: any } = {};
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  /**
   * Check if a form field has a specific error
   * @param control The form control to check
   * @param errorType The type of error to check for
   * @returns True if the control has the specified error
   */
  hasError(control: AbstractControl | null, errorType: string): boolean {
    return control ? control.hasError(errorType) : false;
  }

  /**
   * Get error message for a specific error type
   * @param errorType The type of error
   * @param error The error object
   * @returns Human-readable error message
   */
  getErrorMessage(errorType: string, error: any): string {
    const errorMessages: { [key: string]: string } = {
      'required': 'This field is required',
      'email': 'Please enter a valid email address',
      'minlength': `Minimum length is ${error.requiredLength} characters`,
      'maxlength': `Maximum length is ${error.requiredLength} characters`,
      'pattern': 'Please enter a valid format',
      'min': `Minimum value is ${error.min}`,
      'max': `Maximum value is ${error.max}`
    };

    return errorMessages[errorType] || 'Invalid input';
  }

  /**
   * Validate email format
   * @param email The email string to validate
   * @returns True if email is valid
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Check password strength
   * @param password The password to check
   * @returns Object with strength information
   */
  checkPasswordStrength(password: string): {
    score: number;
    level: 'weak' | 'medium' | 'strong';
    feedback: string[];
  } {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Use at least 8 characters');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include lowercase letters');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include uppercase letters');
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include numbers');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include special characters');
    }

    let level: 'weak' | 'medium' | 'strong';
    if (score < 3) {
      level = 'weak';
    } else if (score < 4) {
      level = 'medium';
    } else {
      level = 'strong';
    }

    return { score, level, feedback };
  }

  /**
   * Mark all form fields as touched
   * @param form The form group to mark as touched
   */
  markAllFieldsAsTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Reset form and mark as pristine/untouched
   * @param form The form group to reset
   */
  resetForm(form: FormGroup): void {
    form.reset();
  }
}
