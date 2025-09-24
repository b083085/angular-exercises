import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyLocalePipe } from '../../pipes/currency-locale.pipe';
import { SearchPipe } from '../../pipes/search.pipe';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyLocalePipe, SearchPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  term = '';

  products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      description: 'Noise-cancelling over-ear headphones with 30h battery life',
      price: 129.99,
      currency: 'USD',
      locale: 'en-US'
    },
    {
      id: 2,
      name: 'Espresso Machine',
      category: 'Home & Kitchen',
      description: '15-bar pump espresso maker with milk frother',
      price: 249.0,
      currency: 'EUR',
      locale: 'de-DE'
    },
    {
      id: 3,
      name: 'Running Shoes',
      category: 'Sportswear',
      description: 'Lightweight trainers suitable for road and treadmill',
      price: 8999,
      currency: 'JPY',
      locale: 'ja-JP'
    },
    {
      id: 4,
      name: 'Smartphone',
      category: 'Electronics',
      description: '6.5" display, 128GB storage, dual-SIM',
      price: 34999.5,
      currency: 'INR',
      locale: 'en-IN'
    }
    ,
    {
      id: 5,
      name: 'Gaming Keyboard',
      category: 'Electronics',
      description: 'Mechanical keyboard with RGB backlight and macro keys',
      price: 79.99,
      currency: 'USD',
      locale: 'en-US'
    },
    {
      id: 6,
      name: 'Bluetooth Speaker',
      category: 'Electronics',
      description: 'Portable speaker with deep bass and 12h playtime',
      price: 59.5,
      currency: 'GBP',
      locale: 'en-GB'
    },
    {
      id: 7,
      name: 'Office Chair',
      category: 'Furniture',
      description: 'Ergonomic chair with lumbar support and breathable mesh',
      price: 149.0,
      currency: 'EUR',
      locale: 'de-DE'
    },
    {
      id: 8,
      name: 'Action Camera',
      category: 'Electronics',
      description: '4K waterproof action cam with image stabilization',
      price: 199.99,
      currency: 'USD',
      locale: 'en-US'
    },
    {
      id: 9,
      name: 'Electric Kettle',
      category: 'Home & Kitchen',
      description: '1.7L stainless steel kettle with auto shut-off',
      price: 34.99,
      currency: 'GBP',
      locale: 'en-GB'
    },
    {
      id: 10,
      name: 'Backpack',
      category: 'Sportswear',
      description: 'Lightweight 25L daypack with padded straps',
      price: 69.95,
      currency: 'EUR',
      locale: 'fr-FR'
    },
    {
      id: 11,
      name: 'LED Monitor',
      category: 'Electronics',
      description: '27" 144Hz IPS monitor with low blue light mode',
      price: 229.0,
      currency: 'USD',
      locale: 'en-US'
    },
    {
      id: 12,
      name: 'Tablet',
      category: 'Electronics',
      description: '10.5" tablet with 128GB storage and stylus support',
      price: 499.0,
      currency: 'AUD',
      locale: 'en-AU'
    },
    {
      id: 13,
      name: 'Mountain Bike',
      category: 'Sportswear',
      description: 'Hardtail MTB with 29" wheels and hydraulic brakes',
      price: 899.0,
      currency: 'EUR',
      locale: 'it-IT'
    },
    {
      id: 14,
      name: 'Air Purifier',
      category: 'Home & Kitchen',
      description: 'HEPA filter air purifier suitable for large rooms',
      price: 24999,
      currency: 'JPY',
      locale: 'ja-JP'
    },
    {
      id: 15,
      name: 'Robot Vacuum',
      category: 'Home & Kitchen',
      description: 'Self-charging vacuum with scheduling and app control',
      price: 299.0,
      currency: 'USD',
      locale: 'en-US'
    },
    {
      id: 16,
      name: 'DSLR Camera',
      category: 'Electronics',
      description: '24MP DSLR with 18-55mm lens and Wi‑Fi',
      price: 1199.0,
      currency: 'CAD',
      locale: 'en-CA'
    },
    {
      id: 17,
      name: 'Smartwatch',
      category: 'Electronics',
      description: 'Fitness tracking, GPS, and heart-rate monitoring',
      price: 199.0,
      currency: 'USD',
      locale: 'en-US'
    },
    {
      id: 18,
      name: 'Coffee Grinder',
      category: 'Home & Kitchen',
      description: 'Burr grinder with 18 settings for consistent grind',
      price: 39.99,
      currency: 'EUR',
      locale: 'es-ES'
    },
    {
      id: 19,
      name: 'Water Bottle',
      category: 'Sportswear',
      description: 'Insulated stainless steel bottle, 1L',
      price: 799.0,
      currency: 'INR',
      locale: 'en-IN'
    }
  ];
}
