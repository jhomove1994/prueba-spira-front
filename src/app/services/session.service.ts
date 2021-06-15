import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

const SERVER = environment.server;

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  token: string;

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  public login( data: any ) {
    const credentials = {
          email: data.username,
          password: data.password
        };
    
    return this.httpService.post('api/login', credentials);
  }


  public logout(): void{
    this.removeCurrentSession();
    window.location.reload();
    this.router.navigate(['/login']);
  }

  setSession( data: any ){
    this.token = data.access_token;
    //this.setRegreshToken(data.refresh_token);
    this.setToken(data.access_token);
    this.setRole(data.role);
    this.setUserName(data.user);
  }

  clearSession = () => localStorage.clear();
  
  getRegreshToken = () => localStorage.getItem('refreshToken');
  setRegreshToken = ( data: string ) => localStorage.setItem('refreshToken', data);

  getToken = () => localStorage.getItem('token');
  setToken = ( data: string ) => localStorage.setItem('token', data);

  getRole = () => localStorage.getItem('role');
  setRole = (data:string) => localStorage.setItem('role', data);

  getUserName = () => localStorage.getItem('user');
  setUserName = (data:string) => localStorage.setItem('user', data);

  getHeaders = () => {
    const bearerToken = `Bearer ${this.token ?? this.getToken()}`;
    return new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Authorization', bearerToken)
  }


  removeCurrentSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    this.token = null;
  }
}
