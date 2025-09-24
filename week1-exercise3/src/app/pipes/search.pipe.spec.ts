import { SearchPipe } from './search.pipe';

interface Item { [key: string]: any; }

describe('SearchPipe', () => {
  const items: Item[] = [
    { name: 'Alpha', category: 'A', description: 'First item' },
    { name: 'Beta', category: 'B', description: 'Second item' },
    { name: 'Gamma', category: 'C', description: 'Third item' },
  ];

  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns original array when term is empty', () => {
    const pipe = new SearchPipe();
    const res = pipe.transform(items, '');
    expect(res.length).toBe(3);
  });

  it('filters by provided keys', () => {
    const pipe = new SearchPipe();
    const res = pipe.transform(items, 'beta', ['name']);
    expect(res.length).toBe(1);
    expect(res[0]['name']).toBe('Beta');
  });

  it('searches all keys when none provided', () => {
    const pipe = new SearchPipe();
    const res = pipe.transform(items, 'second');
    expect(res.length).toBe(1);
    expect(res[0]['name']).toBe('Beta');
  });
});
