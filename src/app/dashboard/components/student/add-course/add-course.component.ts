import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './../../../../services/student.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/interfaces/course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courses: Course[];
  coursesStudent: Course[];
  id:any;
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private courseService: CourseService,
    private studentService: StudentService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.form = fb.group({
      courses: this.fb.array([], Validators.required)
    });
    this.getCourses({
      page: 1,
      size: 5
    });
    this.getCoursesStudent();
  }

  ngOnInit(): void {
  }

  get coursesForm() {
    return this.form.get('courses') as FormArray;
  }

  getCoursesStudent(event = {})
  {
    this.studentService.getCourses(event, this.id).subscribe(data => {
      this.coursesStudent = data.data;
      this.coursesStudent.forEach(element => {
        this.coursesForm.push(this.fb.control(element.id));
      }, err => {        
      });
    });
  }

  getCourses(event = {})
  {
    this.courseService.getCourses(event).subscribe(data => {
      this.courses = data.data;
    });
  }

  updateChkbxArray(chk, isChecked) {
    if (isChecked) {
      if (this.coursesForm.controls.findIndex(x => x.value == chk.id) == -1)
          this.coursesForm.push(this.fb.control(chk.id));
  } else {
      let idx = this.coursesForm.controls.findIndex(x => x.value == chk.id);
      this.coursesForm.removeAt(idx);
  }
  }

  submit() {
      if(this.form.invalid){
        this.form.markAllAsTouched();
      } else {
        this.studentService.addCourse(this.form.getRawValue(),this.id).subscribe( resp => {
          this.router.navigateByUrl(`/details-student/${this.id}`);
        }, err => {        
          
          // @TODO, colocar alerta de error 
        });
      }
  }

  back() {
    this.router.navigateByUrl(`/details-student/${this.id}`);
  }
}
