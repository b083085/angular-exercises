import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ClickCount {
  id: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class ClickTrackerService {
  private counts = new Map<string, number>();
  private countsSubject = new BehaviorSubject<ClickCount[]>([]);

  readonly counts$ = this.countsSubject.asObservable();

  increment(id: string): number {
    const next = (this.counts.get(id) || 0) + 1;
    this.counts.set(id, next);
    this.emitCounts();
    return next;
  }

  getCount(id: string): number {
    return this.counts.get(id) || 0;
  }

  reset(id?: string): void {
    if (id) {
      this.counts.delete(id);
    } else {
      this.counts.clear();
    }
    this.emitCounts();
  }

  private emitCounts(): void {
    const payload: ClickCount[] = Array.from(this.counts.entries()).map(([id, count]) => ({ id, count }));
    this.countsSubject.next(payload);
  }
}
