import { SessionService } from './../../../services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  isExpanded: boolean = false;
  sideMenuAdmin: any[] = [
    {
      'name': 'Dashboard',
      'icon': 'home',
      'route': 'dashboard'
    },
    {
      'name': 'Estudiantes',
      'icon': 'people',
      'route': 'student'
    },
    {
      'name': 'Cursos',
      'icon': 'class',
      'route': 'course'
    }
  ];
  sideMenuStudent: any[] = [
    {
      'name': 'Dashboard',
      'icon': 'home',
      'route': 'dashboard'
    },
    {
      'name': 'Cursos',
      'icon': 'class',
      'route': 'student/course/me'
    }
  ];
  role: string;
  user: string;
  constructor(
    private sessionService: SessionService
  ) { 
    this.role = this.sessionService.getRole();
    this.user = this.sessionService.getUserName();
  }

  ngOnInit(): void {
  }

  logout() {
    this.sessionService.logout();
  }
}
