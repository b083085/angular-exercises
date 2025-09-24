import { TestBed } from '@angular/core/testing';
import { ResponsiveComponent } from './responsive.component';

describe('ResponsiveComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsiveComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ResponsiveComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
