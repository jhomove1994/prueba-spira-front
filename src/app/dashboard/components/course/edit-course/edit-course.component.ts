import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  form: FormGroup;
  id: any;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private _Activatedroute:ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      intensity: new FormControl('', [Validators.required])
    });
  }  

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent()
  {
    this.courseService.getCourse(this.id).subscribe(resp => {
      const data = {
        name: resp.name,
        intensity: resp.intensity
      }
      this.form.setValue(data);
    }, err => {
      this.snackBar.open(err.error.message,'', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
      this.router.navigate(['/course']);
    });
  }

  submit() {
    if(this.form.invalid){
        this.form.markAllAsTouched();
    } else {
      this.courseService.edit(this.form.getRawValue(), this.id).subscribe( resp => {
        this.router.navigate(['/course']);
        
      }, err => {        
        this.snackBar.open(err.error.message,'', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
        this.router.navigate(['/course']);
      });
    }
  }
}
