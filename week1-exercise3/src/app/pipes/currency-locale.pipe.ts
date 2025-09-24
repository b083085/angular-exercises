import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyLocale',
  standalone: true,
  pure: true
})
export class CurrencyLocalePipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    locale: string = 'en-US',
    currency: string = 'USD',
    options: Intl.NumberFormatOptions = {}
  ): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    let num = typeof value === 'number' ? value : Number(value);
    if (isNaN(num)) {
      return '';
    }

    const formatter = new Intl.NumberFormat(locale || 'en-US', {
      style: 'currency',
      currency: currency || 'USD',
      ...options
    });

    return formatter.format(num);
  }
}
