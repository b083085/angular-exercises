import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SiblingPickerComponent } from './sibling-picker.component';
import { DemoItem } from '../services/data-bus.service';

describe('SiblingPickerComponent', () => {
  let component: SiblingPickerComponent;
  let fixture: ComponentFixture<SiblingPickerComponent>;
  const testItems: DemoItem[] = [
    { id: 1, name: 'Test 1', description: 'Test 1' },
    { id: 2, name: 'Test 2', description: 'Test 2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiblingPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiblingPickerComponent);
    component = fixture.componentInstance;
    component.items = testItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display buttons for each item', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(testItems.length);
    
    buttons.forEach((button: HTMLButtonElement, index: number) => {
      expect(button.textContent).toContain(`Select ${testItems[index].name}`);
    });
  });

  it('should emit selected item when a button is clicked', () => {
    spyOn(component.picked, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('button');
    
    buttons[0].click();
    expect(component.picked.emit).toHaveBeenCalledWith(testItems[0]);
    
    buttons[1].click();
    expect(component.picked.emit).toHaveBeenCalledWith(testItems[1]);
  });
});
