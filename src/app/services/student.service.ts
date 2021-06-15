import { SessionService } from './session.service';
import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private headers;
  constructor(
    private httpService: HttpService,
    private sessionService: SessionService
  ) { 
    this.headers = this.sessionService.getHeaders();
  }

  create(data) {
    return this.httpService.post('api/users', data, this.headers).pipe(map( (m:any) => m.data));
  }

  getStudent(id)
  {
    return this.httpService.get(`api/users/${id}`, this.headers).pipe(map( (m:any) => m.data));
  }

  getStudents(args) {
    let params = new HttpParams();
    params = params.append('page', String(args.page));
    params = params.append('size', String(args.size));
    return this.httpService.get('api/users', this.headers, params).pipe(map( (m:any) => m.data));
  }

  getCourses(args, id){
    let params = new HttpParams();
    params = params.append('page', String(args.page));
    params = params.append('size', String(args.size));
    return this.httpService.get(`api/users/${id}/courses`, this.headers, params).pipe(map( (m:any) => m.data));
  }

  addCourse(data,id)
  {
    return this.httpService.post(`api/users/${id}/courses`,data,this.headers).pipe(map( (m:any) => m.data));
  }

  deleteStudent(id:number) {
    return this.httpService.delete(`api/users/${id}`, this.headers).pipe(map( (m:any) => m.data));
  }

  deleteCourse(idStudent:number, idCourse:number) {
    return this.httpService.delete(`api/users/${idStudent}/courses/${idCourse}`, this.headers).pipe(map( (m:any) => m.data));
  }

  edit(data, id:number) {
    return this.httpService.patch(`api/users/${id}`, data, this.headers).pipe(map( (m:any) => m.data));
  }

  myCourses(args) {
    let params = new HttpParams();
    params = params.append('page', String(args.page));
    params = params.append('size', String(args.size));
    return this.httpService.get(`api/users/courses/me`, this.headers, params).pipe(map( (m:any) => m.data));
  }
}
