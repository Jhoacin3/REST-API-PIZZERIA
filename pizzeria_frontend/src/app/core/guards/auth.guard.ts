import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { response } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // if (!authService.isAuthenticated()) {
  //   router.navigate(['/login']); // ✅ Redirige si no está autenticado
  //   return false;
  // }
  return authService.validateSession().pipe(
    map(response => {
      if (response.authenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
