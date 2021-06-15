import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StudentService } from './../../../../services/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/interfaces/course';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {

  public courses: Course[] = [];
  public id:any;

  displayedColumns: string[] = ['id', 'nombre', 'intensidad', 'acciones'];
  dataSource

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _Activatedroute:ActivatedRoute,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { 
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.getCourses({
      page: 1,
      size: 5
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getCourses(event = {})
  {
    this.studentService.getCourses(event, this.id).subscribe(resp => {
      this.courses = resp.data
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.snackBar.open(err.error.message,'', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    });
  }

  ngOnInit(): void {
  }

  private deleteCourse(idCourse)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteCourse(this.id,idCourse).subscribe(resp => {
          this.snackBar.open('Curso eliminado correctamente','', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.getCourses({
            page: 1,
            size: 5
          });
        }, err => {
          this.snackBar.open(err.error.message,'', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        });
      }
    })
    
  }

  public addCourse()
  {
    this.router.navigateByUrl(`/student/${this.id}/add-course`);
  }
}
