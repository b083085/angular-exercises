import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
  pure: true
})
export class SearchPipe implements PipeTransform {
  transform<T extends Record<string, any>>(items: T[] | null | undefined, term: string | null | undefined, keys?: (keyof T)[]): T[] {
    if (!Array.isArray(items)) return [];
    const q = (term ?? '').toString().trim().toLowerCase();
    if (!q) return items;

    const keyList = keys?.length ? keys : undefined;

    return items.filter((item) => {
      if (!item || typeof item !== 'object') return false;

      if (keyList) {
        return keyList.some((k) => this.matches(item[k], q));
      }

      for (const k of Object.keys(item)) {
        if (this.matches(item[k as keyof T], q)) return true;
      }
      return false;
    });
  }

  private matches(value: unknown, q: string): boolean {
    if (value === null || value === undefined) return false;

    const s = String(value).toLowerCase();
    return s.includes(q);
  }
}
