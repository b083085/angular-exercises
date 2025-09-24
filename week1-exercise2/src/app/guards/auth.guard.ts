import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserType } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowed = (route.data?.['allowedUserTypes'] as UserType[] | undefined) ?? undefined;
  if (!allowed || allowed.length === 0) {
    return true;
  }

  const current = auth.userType;
  if (allowed.includes(current)) {
    return true;
  }

  router.navigate(['/no-access']);
  return false;
};
