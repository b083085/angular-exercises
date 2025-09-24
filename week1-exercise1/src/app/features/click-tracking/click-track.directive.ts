import { Directive, HostListener, Input } from '@angular/core';
import { ClickTrackerService } from '../../services/click-tracker.service';

let autoId = 0;

@Directive({
  selector: '[appClickTrack]',
  standalone: true,
})
export class ClickTrackDirective {
  @Input('appClickTrack') id?: string;

  private resolvedId: string;

  constructor(private tracker: ClickTrackerService) {
    this.resolvedId = `clickable-${++autoId}`;
  }

  ngOnInit(): void {
    if (this.id && typeof this.id === 'string' && this.id.trim().length > 0) {
      this.resolvedId = this.id.trim();
    }
  }

  @HostListener('click', ['$event'])
  onClick(_: MouseEvent): void {
    const total = this.tracker.increment(this.resolvedId);
    console.log(`[ClickTrack] ${this.resolvedId} -> ${total}`);
  }
}
