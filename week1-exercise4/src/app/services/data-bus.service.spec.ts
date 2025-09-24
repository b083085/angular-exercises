import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DataBusService, DemoItem } from './data-bus.service';
import { BehaviorSubject } from 'rxjs';
import { filter, skip } from 'rxjs/operators';

describe('DataBusService', () => {
  let service: DataBusService;
  let testItem: DemoItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBusService);
    testItem = { id: 1, name: 'Test', description: 'Test item' };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should publish and receive items', fakeAsync(() => {
    const receivedItems: (DemoItem | null)[] = [];
    
    // Subscribe to the observable
    const subscription = service.item$.subscribe(item => {
      receivedItems.push(item);
    });
    
    // Initial state - should have received null
    expect(receivedItems).toEqual([null]);
    
    // Publish an item
    service.publish(testItem);
    tick();
    
    // Should have received both the initial null and the published item
    expect(receivedItems.length).toBe(2);
    
    // Get the published item (skip the initial null)
    const receivedItem = receivedItems[1];
    
    // Verify the received item matches the test item
    expect(receivedItem).toBeTruthy();
    if (receivedItem) {
      expect(receivedItem.id).toBe(testItem.id);
      expect(receivedItem.name).toBe(testItem.name);
      expect(receivedItem.description).toBe(testItem.description);
    }
    
    // Clean up
    subscription.unsubscribe();
  }));

  it('should handle multiple subscribers', fakeAsync(() => {
    // Create a spy to track the original publish method
    const originalPublish = service.publish.bind(service);
    spyOn(service, 'publish').and.callThrough();
    
    let callCount = 0;
    const receivedItems1: (DemoItem | null)[] = [];
    const receivedItems2: (DemoItem | null)[] = [];
    
    // First subscriber - capture all values
    const subscription1 = service.item$.subscribe(item => {
      callCount++;
      receivedItems1.push(item);
    });
    
    // Second subscriber - capture all values
    const subscription2 = service.item$.subscribe(item => {
      receivedItems2.push(item);
    });
    
    // Initial state - both should have received null
    expect(receivedItems1).toEqual([null]);
    expect(receivedItems2).toEqual([null]);
    
    // Publish an item
    service.publish(testItem);
    tick();
    
    // Both subscribers should receive the published item
    expect(receivedItems1.length).toBe(2);
    expect(receivedItems2.length).toBe(2);
    
    // Get the last received item (skip the initial null)
    const received1 = receivedItems1[1];
    const received2 = receivedItems2[1];
    
    // Verify the received items match the test item
    expect(received1).toBeTruthy();
    if (received1) {
      expect(received1.id).toBe(testItem.id);
      expect(received1.name).toBe(testItem.name);
      expect(received1.description).toBe(testItem.description);
    }
    
    expect(received2).toBeTruthy();
    if (received2) {
      expect(received2.id).toBe(testItem.id);
      expect(received2.name).toBe(testItem.name);
      expect(received2.description).toBe(testItem.description);
    }
    
    // Verify call count for the first subscriber
    expect(callCount).toBe(2); // Initial null + published item
    
    // Clean up
    subscription1.unsubscribe();
    subscription2.unsubscribe();
  }));
});
