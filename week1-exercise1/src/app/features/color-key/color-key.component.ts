import { Component, Input } from '@angular/core';
import { ColorKeyDirective } from './color-key.directive';

@Component({
  selector: 'app-color-key',
  standalone: true,
  imports: [ColorKeyDirective],
  templateUrl: './color-key.component.html',
  styleUrls: ['./color-key.component.css']
})
export class ColorKeyComponent {
}
