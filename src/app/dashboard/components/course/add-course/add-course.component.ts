import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      intensity: new FormControl('', [Validators.required])
    });
  }  

  ngOnInit(): void {
  }

  submit() {
    if(this.form.invalid){
        this.form.markAllAsTouched();
    } else {
      this.courseService.create(this.form.getRawValue()).subscribe( resp => {
        this.router.navigate(['/course']);
      }, err => {
        if(typeof err.error.message) {
          for (const key in err.error.message) {
            this.snackBar.open(err.error.message[key],'', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        } else {
          this.snackBar.open(err.error.message,'', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      });
    }
  }
}
