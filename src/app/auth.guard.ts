import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);

  const globalSession = sessionStorage.getItem('globalSession');

  if (globalSession !== 'true') {
    return router.parseUrl('/login');
  }

  return true;
};
