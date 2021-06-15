import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SessionService } from 'src/app/services/session.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private headers;
  constructor(
    private httpService: HttpService,
    private sessionService: SessionService
  ) { 
    this.headers = this.sessionService.getHeaders();
  }

  getCourses(args){
    let params = new HttpParams();
    params = params.append('page', String(args.page));
    params = params.append('size', String(args.size));
    return this.httpService.get(`api/courses`, this.headers, params).pipe(map( (m:any) => m.data));
  }

  create(data)
  {
    return this.httpService.post('api/courses', data, this.headers).pipe(map( (m:any) => m.data));
  }

  getCourse(id:number)
  {
    return this.httpService.get(`api/courses/${id}`, this.headers).pipe(map( (m:any) => m.data));
  }

  edit(data, id:number)
  {
    return this.httpService.patch(`api/courses/${id}`, data, this.headers).pipe(map( (m:any) => m.data));
  }

  deleteCourse(id:number) {
    return this.httpService.delete(`api/courses/${id}`, this.headers).pipe(map( (m:any) => m.data));
  }
}
