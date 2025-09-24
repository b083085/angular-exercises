import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  // Inject the counter service
  private counterService = inject(CounterService);

  // Expose service signals as readonly
  readonly count = this.counterService.count;
  readonly isEven = this.counterService.isEven;
  readonly isOdd = this.counterService.isOdd;
  readonly isZero = this.counterService.isZero;

  // Component-level computed signals for enhanced even/odd tracking
  readonly parity = computed(() => {
    const currentCount = this.count();
    if (currentCount === 0) return 'zero';
    return currentCount % 2 === 0 ? 'even' : 'odd';
  });

  readonly parityDisplay = computed(() => {
    const currentParity = this.parity();
    const currentCount = this.count();
    switch (currentParity) {
      case 'even': return `${currentCount} is Even`;
      case 'odd': return `${currentCount} is Odd`;
      case 'zero': return 'Zero (neither even nor odd)';
      default: return '';
    }
  });

  readonly parityColor = computed(() => {
    const currentParity = this.parity();
    switch (currentParity) {
      case 'even': return '#48bb78'; // green
      case 'odd': return '#f56565';  // red
      case 'zero': return '#a0aec0'; // gray
      default: return '#2d3748';     // default
    }
  });

  // Methods that delegate to the service
  increment(): void {
    this.counterService.increment();
  }

  decrement(): void {
    this.counterService.decrement();
  }

  reset(): void {
    this.counterService.reset();
  }

  // Computed signals for UI logic
  get countDisplay(): string {
    const currentCount = this.count();
    if (currentCount === 0) return '0';
    if (currentCount > 0) return `+${currentCount}`;
    return currentCount.toString();
  }

  get countColorClass(): string {
    const currentCount = this.count();
    if (currentCount > 0) return 'positive';
    if (currentCount < 0) return 'negative';
    return 'zero';
  }

}
