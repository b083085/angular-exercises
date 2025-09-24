import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoItem } from '../services/data-bus.service';
import { ItemCardComponent } from '../shared/item-card.component';

@Component({
  selector: 'app-sibling-display',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './sibling-display.component.html'
})
export class SiblingDisplayComponent {
  @Input() item: DemoItem | null = null;
}
