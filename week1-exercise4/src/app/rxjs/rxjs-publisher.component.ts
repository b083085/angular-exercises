import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBusService, DemoItem } from '../services/data-bus.service';

@Component({
  selector: 'app-rxjs-publisher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-publisher.component.html',
  styleUrls: ['./rxjs-publisher.component.css']
})
export class RxjsPublisherComponent {
  @Input() items: DemoItem[] = [];
  constructor(private bus: DataBusService){}
  publish(it: DemoItem){ this.bus.publish(it); }
}
