import { Component, OnInit } from '@angular/core';	
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) { 
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]) 
    });
   }

  ngOnInit(): void {
  }

  submit() {
    if(this.loginForm.invalid){
        this.loginForm.markAllAsTouched();
    } else {        
      this.sessionService.login(this.loginForm.getRawValue()).subscribe( resp => {
        this.sessionService.setSession(resp);
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      }, err => {        
        
        // @TODO, colocar alerta de error 
      });
    }
  }

}
