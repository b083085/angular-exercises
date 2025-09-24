import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SiblingDisplayComponent } from './sibling-display.component';
import { ItemCardComponent } from '../shared/item-card.component';
import { DemoItem } from '../services/data-bus.service';

describe('SiblingDisplayComponent', () => {
  let component: SiblingDisplayComponent;
  let fixture: ComponentFixture<SiblingDisplayComponent>;
  const testItem: DemoItem = { id: 1, name: 'Test', description: 'Test description' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiblingDisplayComponent, ItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiblingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Sibling Display" title', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Sibling Display');
  });

  it('should pass item to app-item-card', () => {
    component.item = testItem;
    fixture.detectChanges();
    
    const itemCardElement = fixture.nativeElement.querySelector('app-item-card');
    expect(itemCardElement).toBeTruthy();
    
    const itemCardComponent = fixture.debugElement.children[1].componentInstance as ItemCardComponent;
    expect(itemCardComponent.item).toEqual(testItem);
  });
});
