import { Component } from '@angular/core';
import { ColorKeyComponent } from './features/color-key/color-key.component';
import { ResponsiveComponent } from './features/responsive/responsive.component';
import { ClickTrackingComponent } from './features/click-tracking/click-tracking.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ColorKeyComponent, ResponsiveComponent, ClickTrackingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
