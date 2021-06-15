import { StudentService } from './../../../../services/student.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Course } from './../../../../interfaces/course';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  public courses: Course[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'intensidad'];
  dataSource

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.getCourses({
      page: 1,
      size: 5
    });
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCourses(event = {})
  {
    this.studentService.myCourses(event).subscribe(data => {
      this.courses = data;
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
