import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ChatService} from "../../services/chat.service";
import {AuthService} from "../../services/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  constructor(private auth:AngularFireAuth, private router:Router,private store:AngularFirestore, private service:ChatService, private authService:AuthService, private title:Title) {
  }
signupForm=new FormGroup({
  userName: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required),
})
  ngOnInit(): void {
    this.title.setTitle('HayChat | SignUp');
  }

signupWithEmail() {
  const enteredName = this.signupForm.get('userName')?.value;
  const enteredEmail = this.signupForm.get('email')?.value;
  const enteredPassword = this.signupForm.get('password')?.value;

  this.auth.createUserWithEmailAndPassword(enteredEmail!, enteredPassword!)
    .then(response => {
      console.log(response);
      this.service.creteUserData(enteredEmail, enteredName);
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.log(error);
    })
}

}
