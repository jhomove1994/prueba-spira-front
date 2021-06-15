import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


const SERVER = environment.server;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  get<T>( endPoint: string,  headers?: HttpHeaders , params?: HttpParams, ) { 
    return this.http.get<T>(`${SERVER.url}/${endPoint}`, { params , headers});
  }

  post<T>( endPoint: string, data?: any , headers?: HttpHeaders) {    
    return this.http.post<T>(`${SERVER.url}/${endPoint}`, data, { headers });
  }

  patch<T>( endPoint: string, data?: any , headers?: HttpHeaders) {    
    return this.http.patch<T>(`${SERVER.url}/${endPoint}`, data, { headers });
  }

  delete<T>( endPoint: string, headers?: HttpHeaders) {
    return this.http.delete<T>(`${SERVER.url}/${endPoint}`, { headers });
  }
}
