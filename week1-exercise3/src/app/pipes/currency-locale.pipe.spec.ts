import { CurrencyLocalePipe } from './currency-locale.pipe';

describe('CurrencyLocalePipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyLocalePipe();
    expect(pipe).toBeTruthy();
  });

  it('formats number for en-US USD', () => {
    const pipe = new CurrencyLocalePipe();
    const result = pipe.transform(1234.56, 'en-US', 'USD');
    expect(result).toContain('$');
  });

  it('handles null/undefined/empty', () => {
    const pipe = new CurrencyLocalePipe();
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
    expect(pipe.transform('' as any)).toBe('');
  });
});
