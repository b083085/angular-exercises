import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParentPageComponent } from './parent-page.component';
import { DemoItem } from '../services/data-bus.service';
import { ViewchildDisplayComponent } from '../viewchild/viewchild-display.component';
import { SiblingDisplayComponent } from '../siblings/sibling-display.component';
import { SiblingPickerComponent } from '../siblings/sibling-picker.component';
import { RxjsPublisherComponent } from '../rxjs/rxjs-publisher.component';
import { RxjsSubscriberComponent } from '../rxjs/rxjs-subscriber.component';
import { ItemCardComponent } from '../shared/item-card.component';

describe('ParentPageComponent', () => {
  let component: ParentPageComponent;
  let fixture: ComponentFixture<ParentPageComponent>;
  
  const testItems: DemoItem[] = [
    { id: 1, name: 'Test 1', description: 'Test 1' },
    { id: 2, name: 'Test 2', description: 'Test 2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ParentPageComponent,
        ViewchildDisplayComponent,
        SiblingDisplayComponent,
        SiblingPickerComponent,
        RxjsPublisherComponent,
        RxjsSubscriberComponent,
        ItemCardComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default items', () => {
    expect(component.items.length).toBeGreaterThan(0);
  });

  it('should update selectedItem when onPicked is called', () => {
    const testItem = testItems[0];
    component.onPicked(testItem);
    expect(component.selectedItem).toBe(testItem);
  });

  it('should call setItem on ViewchildDisplayComponent when setViaViewChild is called', () => {
    const testItem = testItems[0];
    // Manually set the ViewChild reference
    component.vcDisplay = {
      setItem: jasmine.createSpy('setItem')
    } as any;
    
    component.setViaViewChild(testItem);
    expect(component.vcDisplay?.setItem).toHaveBeenCalledWith(testItem);
    
    component.setViaViewChild(null);
    expect(component.vcDisplay?.setItem).toHaveBeenCalledWith(null);
  });

  it('should update selectedItem when sibling picker emits', () => {
    const testItem = testItems[1];
    
    // Get the picker component instance
    const picker = fixture.debugElement.query(
      de => de.componentInstance instanceof SiblingPickerComponent
    );
    
    // Simulate the picker emitting an item
    picker.triggerEventHandler('picked', testItem);
    
    // Verify the parent component updated correctly
    expect(component.selectedItem).toEqual(testItem);
  });

  it('should render all section titles', () => {
    const element: HTMLElement = fixture.nativeElement;
    
    expect(element.textContent).toContain('Parent Page');
    expect(element.textContent).toContain('1) Input binding');
    expect(element.textContent).toContain('2) Event binding');
    expect(element.textContent).toContain('3) ViewChild');
    expect(element.textContent).toContain('4) RxJS Service');
  });
});
