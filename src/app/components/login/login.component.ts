import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public router:Router) {
  }
  loginForm=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })
  signIn(){
    const enteredName=this.loginForm.get('userName')?.value;
    const enteredEmail=this.loginForm.get('email')?.value;
    const enteredPassword=this.loginForm.get('password')?.value;
  }
}
