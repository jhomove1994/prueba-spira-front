import { SessionService } from './../services/session.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(    
    private sessionService: SessionService,
    private router: Router
  ) { }

  canActivate() {

    const token = this.sessionService.getRegreshToken();      

    if (token) {
      this.router.navigate(['dashboard']);      
      return false;
    } else {      
      return true;
    }
  }
  
}
