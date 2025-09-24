import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let authService: AuthService;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(AuthService);
  });

  function runGuard(allowed: any[] | undefined, current: any) {
    return TestBed.runInInjectionContext(() => {
      authService.setUserType(current);
      const route = { data: { allowedUserTypes: allowed } } as any;

      return authGuard(route, {} as any);
    });
  }

  it('allows when no allowedUserTypes specified', () => {
    const res = runGuard(undefined, 'guest');
    expect(res).toBeTrue();
  });

  it('allows when current type is allowed', () => {
    const res = runGuard(['member', 'admin'], 'member');
    expect(res).toBeTrue();
  });

  it('denies and navigates when not allowed', () => {
    const res = runGuard(['admin'], 'guest');
    expect(res).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/no-access']);
  });
});
