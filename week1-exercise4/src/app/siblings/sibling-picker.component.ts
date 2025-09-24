import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoItem } from '../services/data-bus.service';

@Component({
  selector: 'app-sibling-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sibling-picker.component.html',
  styleUrls: ['./sibling-picker.component.css']
})
export class SiblingPickerComponent {
  @Input() items: DemoItem[] = [];
  @Output() picked = new EventEmitter<DemoItem>();

  select(it: DemoItem){
    this.picked.emit(it);
  }
}
