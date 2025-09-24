import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { ClickTrackerService, ClickCount } from '../../services/click-tracker.service';
import { Observable } from 'rxjs';
import { ClickTrackDirective } from './click-track.directive';

@Component({
  selector: 'app-click-tracking',
  standalone: true,
  imports: [ClickTrackDirective, AsyncPipe, NgFor],
  templateUrl: './click-tracking.component.html',
  styleUrls: ['./click-tracking.component.css']
})
export class ClickTrackingComponent {
  counts$: Observable<ClickCount[]>;
  constructor(private tracker: ClickTrackerService) {
    this.counts$ = this.tracker.counts$;
  }
}
