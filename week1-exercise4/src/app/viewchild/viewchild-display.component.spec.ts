import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewchildDisplayComponent } from './viewchild-display.component';
import { ItemCardComponent } from '../shared/item-card.component';
import { DemoItem } from '../services/data-bus.service';

describe('ViewchildDisplayComponent', () => {
  let component: ViewchildDisplayComponent;
  let fixture: ComponentFixture<ViewchildDisplayComponent>;
  const testItem: DemoItem = { id: 1, name: 'Test', description: 'Test description' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewchildDisplayComponent, ItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewchildDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have null item by default', () => {
    expect(component.item).toBeNull();
  });

  it('should update item when setItem is called', () => {
    component.setItem(testItem);
    expect(component.item).toEqual(testItem);
    
    component.setItem(null);
    expect(component.item).toBeNull();
  });

  it('should display "ViewChild Display" title', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('ViewChild Display');
  });
});
