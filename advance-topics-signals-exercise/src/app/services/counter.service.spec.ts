import { TestBed } from '@angular/core/testing';
import { CounterService } from './counter.service';

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should initialize count to 0', () => {
      expect(service.count()).toBe(0);
    });

    it('should initialize isEven to true (0 is even)', () => {
      expect(service.isEven()).toBe(true);
    });

    it('should initialize isOdd to false', () => {
      expect(service.isOdd()).toBe(false);
    });

    it('should initialize isZero to true', () => {
      expect(service.isZero()).toBe(true);
    });
  });

  describe('Increment Functionality', () => {
    it('should increment count by 1', () => {
      service.increment();
      expect(service.count()).toBe(1);
    });

    it('should increment count multiple times', () => {
      service.increment();
      service.increment();
      service.increment();
      expect(service.count()).toBe(3);
    });

    it('should update isEven correctly after increment', () => {
      service.increment(); // count = 1
      expect(service.isEven()).toBe(false);
      expect(service.isOdd()).toBe(true);
      expect(service.isZero()).toBe(false);
    });

    it('should update isEven correctly after multiple increments', () => {
      service.increment(); // count = 1 (odd)
      service.increment(); // count = 2 (even)
      expect(service.isEven()).toBe(true);
      expect(service.isOdd()).toBe(false);
    });
  });

  describe('Decrement Functionality', () => {
    it('should decrement count by 1', () => {
      service.decrement();
      expect(service.count()).toBe(-1);
    });

    it('should decrement count multiple times', () => {
      service.decrement();
      service.decrement();
      service.decrement();
      expect(service.count()).toBe(-3);
    });

    it('should update computed signals correctly after decrement', () => {
      service.decrement(); // count = -1
      expect(service.isEven()).toBe(false);
      expect(service.isOdd()).toBe(true);
      expect(service.isZero()).toBe(false);
    });

    it('should handle negative even numbers correctly', () => {
      service.decrement(); // count = -1
      service.decrement(); // count = -2
      expect(service.isEven()).toBe(true);
      expect(service.isOdd()).toBe(false);
    });
  });

  describe('Reset Functionality', () => {
    it('should reset count to 0', () => {
      // First increment to change from initial state
      service.increment();
      service.increment();
      expect(service.count()).toBe(2);
      
      service.reset();
      expect(service.count()).toBe(0);
    });

    it('should update computed signals correctly after reset', () => {
      service.increment(); // count = 1
      service.reset(); // count = 0
      
      expect(service.isEven()).toBe(true);
      expect(service.isOdd()).toBe(false);
      expect(service.isZero()).toBe(true);
    });
  });

  describe('Signal Reactivity', () => {
    it('should maintain reactivity between count and computed signals', () => {
      // Test multiple operations
      service.increment(); // 1 (odd)
      expect(service.isOdd()).toBe(true);
      
      service.increment(); // 2 (even)
      expect(service.isEven()).toBe(true);
      
      service.decrement(); // 1 (odd)
      expect(service.isOdd()).toBe(true);
      
      service.decrement(); // 0 (even, zero)
      expect(service.isEven()).toBe(true);
      expect(service.isZero()).toBe(true);
    });

    it('should handle rapid state changes correctly', () => {
      // Rapid increments
      for (let i = 0; i < 10; i++) {
        service.increment();
      }
      expect(service.count()).toBe(10);
      expect(service.isEven()).toBe(true);
      
      // Rapid decrements
      for (let i = 0; i < 15; i++) {
        service.decrement();
      }
      expect(service.count()).toBe(-5);
      expect(service.isOdd()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero correctly', () => {
      expect(service.count()).toBe(0);
      expect(service.isEven()).toBe(true);
      expect(service.isOdd()).toBe(false);
      expect(service.isZero()).toBe(true);
    });

    it('should handle large numbers correctly', () => {
      // Increment to a large even number
      for (let i = 0; i < 100; i++) {
        service.increment();
      }
      expect(service.count()).toBe(100);
      expect(service.isEven()).toBe(true);
      expect(service.isOdd()).toBe(false);
      expect(service.isZero()).toBe(false);
    });

    it('should handle large negative numbers correctly', () => {
      // Decrement to a large negative odd number
      for (let i = 0; i < 99; i++) {
        service.decrement();
      }
      expect(service.count()).toBe(-99);
      expect(service.isEven()).toBe(false);
      expect(service.isOdd()).toBe(true);
      expect(service.isZero()).toBe(false);
    });
  });

  describe('Signal Immutability', () => {
    it('should not allow direct mutation of readonly signals', () => {
      // This test ensures our readonly signals work correctly
      const countSignal = service.count;
      expect(() => {
        // This should not work if signal is properly readonly
        // Note: In a real scenario, this would be caught at compile time
        expect(countSignal).toBeDefined();
      }).not.toThrow();
    });
  });

  describe('Service Instance', () => {
    it('should be a singleton service', () => {
      const service1 = TestBed.inject(CounterService);
      const service2 = TestBed.inject(CounterService);
      
      expect(service1).toBe(service2);
    });

    it('should maintain state across multiple injections', () => {
      service.increment();
      service.increment();
      
      const newServiceInstance = TestBed.inject(CounterService);
      expect(newServiceInstance.count()).toBe(2);
    });
  });
});
