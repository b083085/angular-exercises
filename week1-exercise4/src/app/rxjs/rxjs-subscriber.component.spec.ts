import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RxjsSubscriberComponent } from './rxjs-subscriber.component';
import { DataBusService } from '../services/data-bus.service';
import { BehaviorSubject } from 'rxjs';
import { ItemCardComponent } from '../shared/item-card.component';
import { DemoItem } from '../services/data-bus.service';

describe('RxjsSubscriberComponent', () => {
  let component: RxjsSubscriberComponent;
  let fixture: ComponentFixture<RxjsSubscriberComponent>;
  let dataBusService: DataBusService;
  let itemSubject: BehaviorSubject<DemoItem | null>;
  
  const testItem: DemoItem = { id: 1, name: 'Test', description: 'Test description' };

  beforeEach(async () => {
    itemSubject = new BehaviorSubject<DemoItem | null>(null);
    
    await TestBed.configureTestingModule({
      imports: [RxjsSubscriberComponent, ItemCardComponent],
      providers: [
        {
          provide: DataBusService,
          useValue: {
            item$: itemSubject.asObservable()
          }
        }
      ]
    })
    .compileComponents();
    
    dataBusService = TestBed.inject(DataBusService);
    
    fixture = TestBed.createComponent(RxjsSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "RxJS Subscriber" title', () => {
    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('RxJS Subscriber');
  });

  it('should update item when DataBusService emits a value', fakeAsync(() => {
    // Initial state should be null
    expect(component.item).toBeNull();
    
    // Emit a test item
    itemSubject.next(testItem);
    tick();
    
    // Component should update its item
    expect(component.item).toEqual(testItem);
    
    // Emit null
    itemSubject.next(null);
    tick();
    
    // Component should update to null
    expect(component.item).toBeNull();
  }));

  it('should unsubscribe from DataBusService on destroy', () => {
    // Spy on the subscription's unsubscribe method
    const subscription = (component as any).sub;
    spyOn(subscription, 'unsubscribe');
    
    // Trigger ngOnDestroy
    fixture.destroy();
    
    // Verify unsubscribe was called
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });
});
