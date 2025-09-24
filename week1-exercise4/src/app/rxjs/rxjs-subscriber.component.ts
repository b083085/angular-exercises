import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DataBusService, DemoItem } from '../services/data-bus.service';
import { ItemCardComponent } from '../shared/item-card.component';

@Component({
  selector: 'app-rxjs-subscriber',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './rxjs-subscriber.component.html'
})
export class RxjsSubscriberComponent implements OnDestroy{
  item: DemoItem | null = null;
  private sub: Subscription;

  constructor(bus: DataBusService){
    this.sub = bus.item$.subscribe(v => this.item = v);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
