import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard canActivate() called');
  
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuthenticated = !!user.token;
        console.log('isAuthenticated:', isAuthenticated);
  
        if (isAuthenticated) {
          return true;
        } else {
          console.log('User is not authenticated. Redirecting to /auth');
          return this.router.createUrlTree(['/auth']);
        }
      })
    );
  }  
}
