import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentComponent } from './components/student/student.component';
import { CourseComponent } from './components/course/course.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { DetailStudentComponent } from './components/student/detail-student/detail-student.component';
import { AddCourseComponent as AddCourseToStudentComponent } from './components/student/add-course/add-course.component';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { MeComponent } from './components/student/me/me.component';

@NgModule({
  declarations: [DashboardComponent, StudentComponent, CourseComponent, WrapperComponent, AddStudentComponent, EditStudentComponent, DetailStudentComponent, AddCourseToStudentComponent, AddCourseComponent, EditCourseComponent, MeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
