import { Router } from '@angular/router';
import { StudentService } from './../../../../services/student.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmedValidatorService } from 'src/app/services/confirmed-validator.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private confirmedValidatorService: ConfirmedValidatorService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    }, { 
      validator: this.confirmedValidatorService.validate('password', 'password_confirmation')
    });
  }  

  ngOnInit(): void {
  }

  submit() {
    if(this.form.invalid){
        this.form.markAllAsTouched();
    } else {
      this.studentService.create(this.form.getRawValue()).subscribe( resp => {
        this.router.navigate(['/student']);
        
      }, err => {        
        
        // @TODO, colocar alerta de error 
      });
    }
  }
}
