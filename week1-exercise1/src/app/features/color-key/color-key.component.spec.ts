import { TestBed } from '@angular/core/testing';
import { ColorKeyComponent } from './color-key.component';

describe('ColorKeyComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorKeyComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ColorKeyComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
