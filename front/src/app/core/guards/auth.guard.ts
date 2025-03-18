import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services';
import { AppState } from '../store/app-store.state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { isGranted, loadingRole } from '../store/role'

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    console.log('authguard')
    if (!this.authService.isAuthenticated()) {
      console.log('not authenticated')
      if (state.url !== '/login') {
        console.log('not login page')
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      console.log('authenticated')
      this.store.dispatch(loadingRole());
      return this.store.pipe(
        select(isGranted),
        filter(granted => granted !== null),
        map(granted => {
            // `granted` is boolean as we def0ined in "Actions" as `isGranted`
          if (!granted) {
          if (state.url !== '/login') {
            console.log('not login page')
            this.router.navigate(['/login']);
              return false;
            }
          } else {
            if(state.url === '/login') {
              this.router.navigate(['/annot']);
              return true;
            }
          }
          // Let "Router" allow user entering the page
          return true;
        })
      );
    }
    return true;
  }
}
