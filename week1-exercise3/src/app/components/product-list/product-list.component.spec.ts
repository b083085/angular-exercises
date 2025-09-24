import { TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should render product items and filter with search term', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    fixture.detectChanges();

    let items = fixture.nativeElement.querySelectorAll('ul li');
    expect(items.length).toBeGreaterThan(0);

    const comp = fixture.componentInstance;
    comp.term = 'espresso';
    fixture.detectChanges();

    items = fixture.nativeElement.querySelectorAll('ul li');

    expect(items.length).toBeGreaterThan(0);
  });
});
