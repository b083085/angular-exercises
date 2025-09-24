import { Component } from '@angular/core';
import { ParentPageComponent } from './parent/parent-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ParentPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
