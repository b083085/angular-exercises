import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DemoItem {
  id: number;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class DataBusService {
  private _item$ = new BehaviorSubject<DemoItem | null>(null);
  readonly item$ = this._item$.asObservable();

  publish(item: DemoItem) {
    this._item$.next(item);
  }
}
