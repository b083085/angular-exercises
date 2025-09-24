import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoItem } from '../services/data-bus.service';
import { SiblingDisplayComponent } from '../siblings/sibling-display.component';
import { SiblingPickerComponent } from '../siblings/sibling-picker.component';
import { ViewchildDisplayComponent } from '../viewchild/viewchild-display.component';
import { RxjsPublisherComponent } from '../rxjs/rxjs-publisher.component';
import { RxjsSubscriberComponent } from '../rxjs/rxjs-subscriber.component';

@Component({
  selector: 'app-parent-page',
  standalone: true,
  imports: [CommonModule, SiblingDisplayComponent, SiblingPickerComponent, ViewchildDisplayComponent, RxjsPublisherComponent, RxjsSubscriberComponent],
  templateUrl: './parent-page.component.html',
  styleUrls: ['./parent-page.component.css']
})
export class ParentPageComponent {
  items: DemoItem[] = [
    { id: 1, name: 'Alpha', description: 'The first item' },
    { id: 2, name: 'Beta', description: 'The second item' },
    { id: 3, name: 'Gamma', description: 'The third item' },
  ];

  selectedItem: DemoItem | null = null;

  @ViewChild('vcDisplay') vcDisplay?: ViewchildDisplayComponent;

  onPicked(it: DemoItem){
    this.selectedItem = it;
  }

  setViaViewChild(it: DemoItem | null){
    this.vcDisplay?.setItem(it);
  }
}
