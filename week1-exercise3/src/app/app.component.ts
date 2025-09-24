import { Component } from '@angular/core';
import { CurrencyLocalePipe } from './pipes/currency-locale.pipe';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyLocalePipe, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
