import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card.component';
import { DemoItem } from '../services/data-bus.service';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;
  const testItem: DemoItem = { id: 1, name: 'Test', description: 'Test description' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No item selected" when item is null', () => {
    component.item = null;
    fixture.detectChanges();
    
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('No item selected');
  });

  it('should display item details when item is provided', () => {
    component.item = testItem;
    fixture.detectChanges();
    
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain(testItem.name);
    expect(element.textContent).toContain(`ID: ${testItem.id}`);
    expect(element.textContent).toContain(testItem.description);
  });
});
