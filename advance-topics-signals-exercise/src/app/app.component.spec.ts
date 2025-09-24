import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { CounterService } from './services/counter.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [CounterService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('Angular Signals Counter Demo');
  });

  it('should render the counter component', () => {
    const counterComponent = debugElement.query(By.css('app-counter'));
    expect(counterComponent).toBeTruthy();
  });

    it('should contain only the counter component', () => {
      const counterComponent = debugElement.query(By.css('app-counter'));
      expect(counterComponent).toBeTruthy();
      
      // The counter component should be the main element
      expect(counterComponent.nativeElement.tagName.toLowerCase()).toBe('app-counter');
    });

  it('should pass CounterService to child component', () => {
    const counterComponentDebug = debugElement.query(By.directive(CounterComponent));
    const counterComponent = counterComponentDebug.componentInstance;
    
    // The counter component should have access to the counter service
    expect(counterComponent['counterService']).toBeTruthy();
    expect(counterComponent['counterService']).toBeInstanceOf(CounterService);
  });

  describe('Component Structure', () => {
    it('should have proper component metadata', () => {
      expect(component.title).toBeDefined();
      expect(typeof component.title).toBe('string');
    });

    it('should render without errors', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should be a standalone component', () => {
      // This test verifies that the component can be imported directly
      const componentInstance = new AppComponent();
      expect(componentInstance).toBeInstanceOf(AppComponent);
    });
  });

  describe('Integration with Counter Component', () => {
    it('should allow counter component to function properly', () => {
      const counterComponentDebug = debugElement.query(By.directive(CounterComponent));
      const counterComponent = counterComponentDebug.componentInstance;
      
      // Test that the counter component can access the service
      expect(counterComponent.count()).toBe(0);
      
      // Test that the counter component can modify state
      counterComponent.increment();
      expect(counterComponent.count()).toBe(1);
    });

    it('should maintain counter state across component interactions', () => {
      const counterComponentDebug = debugElement.query(By.directive(CounterComponent));
      const counterComponent = counterComponentDebug.componentInstance;
      
      // Perform some operations
      counterComponent.increment();
      counterComponent.increment();
      counterComponent.decrement();
      
      // State should be maintained
      expect(counterComponent.count()).toBe(1);
      
      // Reset and verify
      counterComponent.reset();
      expect(counterComponent.count()).toBe(0);
    });
  });

  describe('Template Rendering', () => {
    it('should render the counter component with correct selector', () => {
      const counterElement = debugElement.query(By.css('app-counter'));
      expect(counterElement).toBeTruthy();
      expect(counterElement.nativeElement.tagName.toLowerCase()).toBe('app-counter');
    });

    it('should not render any additional content', () => {
      const counterElement = debugElement.query(By.css('app-counter'));
      expect(counterElement).toBeTruthy();
      expect(counterElement.nativeElement.tagName.toLowerCase()).toBe('app-counter');
      
      // Check that the counter component is the only direct child
      const children = debugElement.nativeElement.children;
      expect(children.length).toBe(1);
      expect(children[0].tagName.toLowerCase()).toBe('app-counter');
    });
  });

  describe('Component Lifecycle', () => {
    it('should initialize without errors', () => {
      expect(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
      }).not.toThrow();
    });

    it('should handle change detection properly', () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should handle multiple change detection cycles', () => {
      expect(() => {
        fixture.detectChanges();
        fixture.detectChanges();
        fixture.detectChanges();
      }).not.toThrow();
    });
  });

  describe('Service Integration', () => {
    it('should provide CounterService to child components', () => {
      const counterService = TestBed.inject(CounterService);
      expect(counterService).toBeTruthy();
      expect(counterService).toBeInstanceOf(CounterService);
    });

    it('should use singleton CounterService instance', () => {
      const service1 = TestBed.inject(CounterService);
      const service2 = TestBed.inject(CounterService);
      
      expect(service1).toBe(service2);
    });
  });
});
