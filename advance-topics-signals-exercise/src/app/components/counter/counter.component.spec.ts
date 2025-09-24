import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './counter.component';
import { CounterService } from '../../services/counter.service';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let counterService: CounterService;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
      providers: [CounterService]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    counterService = TestBed.inject(CounterService);
    debugElement = fixture.debugElement;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial Rendering', () => {
    it('should display initial count of 0', () => {
      const countElement = debugElement.query(By.css('.count-value'));
      expect(countElement.nativeElement.textContent.trim()).toBe('0');
    });

    it('should display initial parity information', () => {
      const parityInfo = debugElement.query(By.css('.parity-info'));
      expect(parityInfo.nativeElement.textContent.trim()).toBe('Zero (neither even nor odd)');
    });

    it('should have Even badge active initially (0 is even)', () => {
      const evenBadge = debugElement.query(By.css('.parity-badge.even'));
      expect(evenBadge.nativeElement.classList.contains('active')).toBe(true);
    });

    it('should have Odd badge not active initially', () => {
      const oddBadge = debugElement.query(By.css('.parity-badge.odd'));
      expect(oddBadge.nativeElement.classList.contains('active')).toBe(false);
    });

    it('should render all three action buttons', () => {
      const buttons = debugElement.queryAll(By.css('.action-btn'));
      expect(buttons.length).toBe(3);
      
      const buttonTexts = buttons.map(btn => btn.nativeElement.textContent.trim());
      expect(buttonTexts).toContain('− Decrement');
      expect(buttonTexts).toContain('↻ Reset');
      expect(buttonTexts).toContain('+ Increment');
    });
  });

  describe('Button Functionality', () => {
    it('should call increment when increment button is clicked', () => {
      spyOn(component, 'increment');
      const incrementButton = debugElement.query(By.css('.increment-btn'));
      
      incrementButton.triggerEventHandler('click', null);
      
      expect(component.increment).toHaveBeenCalled();
    });

    it('should call decrement when decrement button is clicked', () => {
      spyOn(component, 'decrement');
      const decrementButton = debugElement.query(By.css('.decrement-btn'));
      
      decrementButton.triggerEventHandler('click', null);
      
      expect(component.decrement).toHaveBeenCalled();
    });

    it('should call reset when reset button is clicked', () => {
      spyOn(component, 'reset');
      const resetButton = debugElement.query(By.css('.reset-btn'));
      
      resetButton.triggerEventHandler('click', null);
      
      expect(component.reset).toHaveBeenCalled();
    });
  });

  describe('Count Display Updates', () => {
    it('should update count display when count changes', () => {
      // Increment count
      counterService.increment();
      fixture.detectChanges();
      
      const countElement = debugElement.query(By.css('.count-value'));
      expect(countElement.nativeElement.textContent.trim()).toBe('+1');
    });

    it('should display negative numbers correctly', () => {
      // Decrement count
      counterService.decrement();
      fixture.detectChanges();
      
      const countElement = debugElement.query(By.css('.count-value'));
      expect(countElement.nativeElement.textContent.trim()).toBe('-1');
    });

    it('should display zero correctly', () => {
      // First increment then reset
      counterService.increment();
      counterService.reset();
      fixture.detectChanges();
      
      const countElement = debugElement.query(By.css('.count-value'));
      expect(countElement.nativeElement.textContent.trim()).toBe('0');
    });
  });

  describe('Parity Display Updates', () => {
    it('should update parity info when count becomes odd', () => {
      counterService.increment(); // count = 1 (odd)
      fixture.detectChanges();
      
      const parityInfo = debugElement.query(By.css('.parity-info'));
      expect(parityInfo.nativeElement.textContent.trim()).toBe('1 is Odd');
    });

    it('should update parity info when count becomes even', () => {
      counterService.increment(); // count = 1
      counterService.increment(); // count = 2 (even)
      fixture.detectChanges();
      
      const parityInfo = debugElement.query(By.css('.parity-info'));
      expect(parityInfo.nativeElement.textContent.trim()).toBe('2 is Even');
    });

    it('should update parity badges correctly', () => {
      // Test odd number
      counterService.increment(); // count = 1
      fixture.detectChanges();
      
      const evenBadge = debugElement.query(By.css('.parity-badge.even'));
      const oddBadge = debugElement.query(By.css('.parity-badge.odd'));
      
      expect(evenBadge.nativeElement.classList.contains('active')).toBe(false);
      expect(oddBadge.nativeElement.classList.contains('active')).toBe(true);
      
      // Test even number
      counterService.increment(); // count = 2
      fixture.detectChanges();
      
      expect(evenBadge.nativeElement.classList.contains('active')).toBe(true);
      expect(oddBadge.nativeElement.classList.contains('active')).toBe(false);
    });
  });

  describe('Color Classes', () => {
    it('should apply positive class for positive numbers', () => {
      counterService.increment(); // count = 1
      fixture.detectChanges();
      
      const countElement = debugElement.query(By.css('.count-value'));
      expect(countElement.nativeElement.classList.contains('positive')).toBe(true);
    });

    it('should apply negative class for negative numbers', () => {
      counterService.decrement(); // count = -1
      fixture.detectChanges();
      
      const countElement = debugElement.query(By.css('.count-value'));
      expect(countElement.nativeElement.classList.contains('negative')).toBe(true);
    });

    it('should apply zero class for zero', () => {
      const countElement = debugElement.query(By.css('.count-value'));
      expect(countElement.nativeElement.classList.contains('zero')).toBe(true);
    });
  });

  describe('Button States', () => {
    it('should disable increment button when count reaches 10', () => {
      // Increment to 10
      for (let i = 0; i < 10; i++) {
        counterService.increment();
      }
      fixture.detectChanges();
      
      const incrementButton = debugElement.query(By.css('.increment-btn'));
      expect(incrementButton.nativeElement.disabled).toBe(true);
    });

    it('should disable decrement button when count reaches -10', () => {
      // Decrement to -10
      for (let i = 0; i < 10; i++) {
        counterService.decrement();
      }
      fixture.detectChanges();
      
      const decrementButton = debugElement.query(By.css('.decrement-btn'));
      expect(decrementButton.nativeElement.disabled).toBe(true);
    });

    it('should disable reset button when count is zero', () => {
      const resetButton = debugElement.query(By.css('.reset-btn'));
      expect(resetButton.nativeElement.disabled).toBe(true);
    });

    it('should enable reset button when count is not zero', () => {
      counterService.increment(); // count = 1
      fixture.detectChanges();
      
      const resetButton = debugElement.query(By.css('.reset-btn'));
      expect(resetButton.nativeElement.disabled).toBe(false);
    });
  });

  describe('Computed Signals Integration', () => {
    it('should update all computed signals when count changes', () => {
      // Test parity computed signal
      expect(component.parity()).toBe('zero');
      
      counterService.increment(); // count = 1
      expect(component.parity()).toBe('odd');
      
      counterService.increment(); // count = 2
      expect(component.parity()).toBe('even');
    });

    it('should update parity display computed signal', () => {
      expect(component.parityDisplay()).toBe('Zero (neither even nor odd)');
      
      counterService.increment(); // count = 1
      expect(component.parityDisplay()).toBe('1 is Odd');
      
      counterService.increment(); // count = 2
      expect(component.parityDisplay()).toBe('2 is Even');
    });

    it('should update parity color computed signal', () => {
      expect(component.parityColor()).toBe('#a0aec0'); // gray for zero
      
      counterService.increment(); // count = 1
      expect(component.parityColor()).toBe('#f56565'); // red for odd
      
      counterService.increment(); // count = 2
      expect(component.parityColor()).toBe('#48bb78'); // green for even
    });
  });

  describe('Component Methods', () => {
    it('should delegate increment to service', () => {
      spyOn(counterService, 'increment');
      component.increment();
      expect(counterService.increment).toHaveBeenCalled();
    });

    it('should delegate decrement to service', () => {
      spyOn(counterService, 'decrement');
      component.decrement();
      expect(counterService.decrement).toHaveBeenCalled();
    });

    it('should delegate reset to service', () => {
      spyOn(counterService, 'reset');
      component.reset();
      expect(counterService.reset).toHaveBeenCalled();
    });
  });

  describe('UI Logic Getters', () => {
    it('should return correct count display for positive numbers', () => {
      counterService.increment(); // count = 1
      expect(component.countDisplay).toBe('+1');
    });

    it('should return correct count display for negative numbers', () => {
      counterService.decrement(); // count = -1
      expect(component.countDisplay).toBe('-1');
    });

    it('should return correct count display for zero', () => {
      expect(component.countDisplay).toBe('0');
    });

    it('should return correct color class for positive numbers', () => {
      counterService.increment(); // count = 1
      expect(component.countColorClass).toBe('positive');
    });

    it('should return correct color class for negative numbers', () => {
      counterService.decrement(); // count = -1
      expect(component.countColorClass).toBe('negative');
    });

    it('should return correct color class for zero', () => {
      expect(component.countColorClass).toBe('zero');
    });
  });

  describe('Accessibility', () => {
    it('should have proper button titles', () => {
      const incrementButton = debugElement.query(By.css('.increment-btn'));
      const decrementButton = debugElement.query(By.css('.decrement-btn'));
      const resetButton = debugElement.query(By.css('.reset-btn'));
      
      expect(incrementButton.nativeElement.getAttribute('title')).toBe('Increment counter');
      expect(decrementButton.nativeElement.getAttribute('title')).toBe('Decrement counter');
      expect(resetButton.nativeElement.getAttribute('title')).toBe('Reset counter to zero');
    });
  });
});
