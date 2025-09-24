# Testing Guide

This project uses Jasmine and Karma for unit testing Angular components and services.

## Test Setup

### Dependencies
- **Jasmine**: Testing framework
- **Karma**: Test runner
- **@angular/core/testing**: Angular testing utilities

### Configuration Files
- `karma.conf.js`: Karma configuration
- `tsconfig.spec.json`: TypeScript configuration for tests
- `src/test.ts`: Test environment setup

## Running Tests

### Command Line
```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Using Angular CLI
ng test
ng test --watch
```

## Test Files

### Component Tests
- `src/app/app.component.spec.ts`: Tests for the main AppComponent
  - Form initialization
  - Validation logic
  - User interactions
  - Template integration
  - Accessibility

### Service Tests
- `src/app/services/form-validation.service.spec.ts`: Tests for form validation service
  - Email validation
  - Password validation
  - Form state management
  - Error handling

## Test Categories

### 1. Component Initialization
- Component creation
- Form setup
- Property initialization

### 2. Form Validation
- Required field validation
- Email format validation
- Password length validation
- Form state tracking

### 3. User Interactions
- Form submission
- Form reset
- Input field interactions
- Button clicks

### 4. Real-time Validation
- Field touched state
- Validation feedback
- Error message display
- Success indicators

### 5. Template Integration
- DOM element rendering
- Form binding
- Event handling
- Accessibility

### 6. Service Testing
- Form validation logic
- Error message generation
- Password strength checking
- Form state management

## Test Structure

Each test file follows this structure:

```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Test configuration
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Feature Group', () => {
    it('should test specific behavior', () => {
      // Test implementation
    });
  });
});
```

## Best Practices

1. **Descriptive Test Names**: Use clear, descriptive test names
2. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and verification
3. **Isolation**: Each test should be independent
4. **Mocking**: Use spies and mocks for external dependencies
5. **Coverage**: Aim for comprehensive test coverage

## Coverage Reports

Test coverage reports are generated in the `coverage/` directory after running tests. Open `coverage/index.html` in a browser to view detailed coverage information.

## Debugging Tests

### Browser Debugging
- Tests run in a browser environment
- Use browser developer tools to debug
- Add `debugger;` statements in tests

### Console Output
- Check console for test results
- Look for error messages and stack traces
- Verify test descriptions and expectations
