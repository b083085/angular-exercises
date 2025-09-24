import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClickTrackingComponent } from './click-tracking.component';
import { ClickTrackerService, ClickCount } from '../../services/click-tracker.service';

class ClickTrackerServiceStub {
  counts$ = of<ClickCount[]>([{ id: 'a', count: 1 }]);
}

describe('ClickTrackingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickTrackingComponent],
      providers: [
        { provide: ClickTrackerService, useClass: ClickTrackerServiceStub }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ClickTrackingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
