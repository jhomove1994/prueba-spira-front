import { MeComponent } from './components/student/me/me.component';
import { AuthGuard } from './../guard/auth.guard';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { CourseComponent } from './components/course/course.component';
import { StudentComponent } from './components/student/student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { DetailStudentComponent } from './components/student/detail-student/detail-student.component';
import { AddCourseComponent as AddCourseToUserComponent } from './components/student/add-course/add-course.component';

const routes: Routes = [
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'student',
                component: StudentComponent,
                canActivate: [AuthGuard],
                data: {
                    role: 'administrador'
                }
            },
            {
                path: 'add-student',
                component: AddStudentComponent,
                canActivate: [AuthGuard],
                data: {
                    role: 'administrador'
                }
            },
            {
                path: 'edit-student/:id',
                component: EditStudentComponent,
                canActivate: [AuthGuard],
                data: {
                    role: 'administrador'
                }
            },
            {
                path: 'details-student/:id',
                component: DetailStudentComponent,
                canActivate: [AuthGuard],
                data: {
                    role: 'administrador'
                }
            },
            {
                path: 'student/:id/add-course',
                component: AddCourseToUserComponent,
                canActivate: [AuthGuard],
                data: {
                    role: 'administrador'
                }
            },
            {
                path: 'course',
                component: CourseComponent,
                canActivate: [AuthGuard],
                data: {
                    role: 'administrador'
                }
            },
            {
                path: 'add-course',
                component: AddCourseComponent,
                canActivate: [AuthGuard],
                data: {
                    role: 'administrador'
                }
            },
            {
                path: 'edit-course/:id',
                component: EditCourseComponent,
                canActivate: [AuthGuard],
                data: {
                    role: 'administrador'
                }
            },
            {
                path: 'student/course/me',
                component: MeComponent,
                canActivate: [AuthGuard],
                data: {
                    role: 'alumno'
                }
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
