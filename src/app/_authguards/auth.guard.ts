import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('ownerId') as string;
  if (token === null || token === undefined) {
    inject(Router).navigate(['login']);
    inject(AuthService).singOut();
    return false;
  }

  return true;
};
