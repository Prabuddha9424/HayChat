import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { TwitterAuthProvider } from "firebase/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ChatService} from "../../services/chat.service";
import {UserData} from "./userData";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public router:Router, private auth:AngularFireAuth, private store:AngularFirestore, private service:ChatService) {
  }
  loginForm=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })
  async signinWithEmail() {
    const enteredEmail = this.loginForm.get('email')?.value;
    const enteredName = this.loginForm.get('name')?.value;
    const enteredPassword = this.loginForm.get('password')?.value;
    this.service.enteredEmail=enteredEmail;

    await this.auth.signInWithEmailAndPassword(enteredEmail!, enteredPassword!)
      .then(response => {
        console.log(response);
        this.service.getCurrentUser();
        this.router.navigateByUrl('/chat');
      }).catch(error => {
      console.log(error);
    });
  }
  signInWithFacebook(){
    this.auth.signInWithRedirect(new FacebookAuthProvider())
      .then(response=>{
        console.log(response);
        this.router.navigateByUrl('/chat');
      }).catch(error=>{
      console.log(error);
    })
  }
  signInWithGoogle(){
    this.auth.signInWithPopup(new GoogleAuthProvider())
      .then(response=>{
        console.log(response);
        this.router.navigateByUrl('/chat');
      }).catch(error=>{
      console.log(error);
    })
  }
  signInWithTwitter(){
    this.auth.signInWithRedirect(new TwitterAuthProvider())
      .then(response=>{
        console.log(response);
        this.router.navigateByUrl('/chat');
      }).catch(error=>{
      console.log(error);
    })
  }
  signInWithGithub(){
    this.auth.signInWithRedirect(new GithubAuthProvider())
      .then(response=>{
        console.log(response);
        this.router.navigateByUrl('/chat');
      }).catch(error=>{
      console.log(error);
    })
  }
}
