import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(    
    private sessionService: SessionService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    console.log('hola');
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    const token = this.sessionService.getToken(); 
    if (token) {
      this.sessionService.token = token;
      const userRole = this.sessionService.getRole();
      console.log(route.data.role);
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        //this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
