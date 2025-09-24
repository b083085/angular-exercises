import { Component } from '@angular/core';
import { ResponsiveClassDirective } from './responsive-class.directive';

@Component({
  selector: 'app-responsive',
  standalone: true,
  imports: [ResponsiveClassDirective],
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.css']
})
export class ResponsiveComponent {}
