import { TestBed } from '@angular/core/testing';
import { NoAccessComponent } from './no-access.component';

describe('NoAccessComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAccessComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NoAccessComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should render no access text', () => {
    const fixture = TestBed.createComponent(NoAccessComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('No Access');
  });
});
