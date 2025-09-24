import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxjsPublisherComponent } from './rxjs-publisher.component';
import { DataBusService, DemoItem } from '../services/data-bus.service';

describe('RxjsPublisherComponent', () => {
  let component: RxjsPublisherComponent;
  let fixture: ComponentFixture<RxjsPublisherComponent>;
  let dataBusService: jasmine.SpyObj<DataBusService>;
  
  const testItems: DemoItem[] = [
    { id: 1, name: 'Test 1', description: 'Test 1' },
    { id: 2, name: 'Test 2', description: 'Test 2' }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataBusService', ['publish']);
    
    await TestBed.configureTestingModule({
      imports: [RxjsPublisherComponent],
      providers: [
        { provide: DataBusService, useValue: spy }
      ]
    })
    .compileComponents();
    
    dataBusService = TestBed.inject(DataBusService) as jasmine.SpyObj<DataBusService>;
    
    fixture = TestBed.createComponent(RxjsPublisherComponent);
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
      expect(button.textContent).toContain(`Publish ${testItems[index].name}`);
    });
  });

  it('should call publish on DataBusService when a button is clicked', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    
    buttons[0].click();
    expect(dataBusService.publish).toHaveBeenCalledWith(testItems[0]);
    
    buttons[1].click();
    expect(dataBusService.publish).toHaveBeenCalledWith(testItems[1]);
  });
});
