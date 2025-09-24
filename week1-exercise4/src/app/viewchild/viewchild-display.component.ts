import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoItem } from '../services/data-bus.service';
import { ItemCardComponent } from '../shared/item-card.component';

@Component({
  selector: 'app-viewchild-display',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './viewchild-display.component.html'
})
export class ViewchildDisplayComponent {
  item: DemoItem | null = null;

  setItem(it: DemoItem | null){
    this.item = it;
  }
}
