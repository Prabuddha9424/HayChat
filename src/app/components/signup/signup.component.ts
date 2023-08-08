import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
signupForm=new FormGroup({
  userName: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required),
})
signup(){
  const enteredName=this.signupForm.get('userName')?.value;
  const enteredEmail=this.signupForm.get('email')?.value;
  const enteredPassword=this.signupForm.get('password')?.value;
}
}
