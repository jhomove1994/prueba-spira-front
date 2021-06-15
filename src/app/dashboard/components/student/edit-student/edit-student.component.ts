import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './../../../../services/student.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  form: FormGroup;
  id: any;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private _Activatedroute:ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required])
    });
  }  

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent()
  {
    this.studentService.getStudent(this.id).subscribe(resp => {
      const data = {
        name: resp.name,
        email: resp.email,
        phone: resp.phone
      }
      this.form.setValue(data);
    }, err => {
      this.snackBar.open(err.error.message,'', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
      this.router.navigate(['/student']);
    });
  }

  submit() {
    if(this.form.invalid){
        this.form.markAllAsTouched();
    } else {
      this.studentService.edit(this.form.getRawValue(), this.id).subscribe( resp => {
        this.router.navigate(['/student']);
        
      }, err => {        
        this.snackBar.open(err.error.message,'', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
        this.router.navigate(['/student']);
      });
    }
  }
}
