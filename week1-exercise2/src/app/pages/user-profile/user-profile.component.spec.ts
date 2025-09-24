import { TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('UserProfileComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '123' }))
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UserProfileComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should read id from route params and render it', () => {
    const fixture = TestBed.createComponent(UserProfileComponent);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    expect(comp.userId).toBe('123');

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('123');
  });
});
