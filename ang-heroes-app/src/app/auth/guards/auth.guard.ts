import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor (private authService: AuthService, private router: Router) {}

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.verifyToken()
        .pipe(
          tap( isAuth => {
            if (!isAuth) {
              console.log('CanActivate - Blocked by guard');
              this.router.navigate(['/auth/login']);
            }
          })
        );

      /*
      if (this.authService.auth.id) {
        return true;
      }
      console.log('CanActivate - Blocked by guard');
      return false;
      */
  }
  

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.verifyToken()
        .pipe(
          tap( isAuth => {
            if (!isAuth) {
              console.log('CanLoad - Blocked by guard');
              this.router.navigate(['/auth/login']);
            }
          })
        );
      /*
      if (this.authService.auth.id) {
        return true;
      }
      console.log('CanLoad - Blocked by guard');
      return false;
      */
  }

}
