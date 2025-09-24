import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  // Private signal for internal state management
  private _count = signal<number>(0);

  // Public readonly signals for components to consume
  readonly count = this._count.asReadonly();

  // Computed signals for derived state
  readonly isEven = computed(() => this._count() % 2 === 0);
  readonly isOdd = computed(() => this._count() % 2 !== 0);
  readonly isZero = computed(() => this._count() === 0);

  // Actions that modify the state
  increment(): void {
    const newCount = this._count() + 1;
    this._count.set(newCount);
  }

  decrement(): void {
    const newCount = this._count() - 1;
    this._count.set(newCount);
  }

  reset(): void {
    this._count.set(0);
  }
}
