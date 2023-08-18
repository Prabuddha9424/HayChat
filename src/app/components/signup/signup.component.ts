import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ChatService} from "../../services/chat.service";
import {AuthService} from "../../services/auth.service";
import {Title} from "@angular/platform-browser";
import {error} from "@angular/compiler-cli/src/transformers/util";
import * as url from "url";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  constructor(private auth:AngularFireAuth, private router:Router,private store:AngularFirestore, private service:ChatService, private authService:AuthService, private title:Title) {
  }

  selectedImage:any;
  profileImage:any;

signupForm=new FormGroup({
  userName: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required),
  selectImage: new FormControl()
})
  ngOnInit(): void {
    this.title.setTitle('HayChat | SignUp');
  }

signupWithEmail() {
    const enteredName = this.signupForm.get('userName')?.value;
    const enteredEmail = this.signupForm.get('email')?.value;
    const enteredPassword = this.signupForm.get('password')?.value;

    this.service.uploadImg(enteredEmail!, this.selectedImage)
        .then(()=>{
            console.log('Profile image upload for storage!');
            return this.service.getImageUrl(enteredEmail!).toPromise();
        })
        .then(url=>{
            this.profileImage=url;
            console.log(this.profileImage);
            console.log('Profile image upload from storage to firestore!');
            return this.auth.createUserWithEmailAndPassword(enteredEmail!, enteredPassword!);
        })
        .then(data=>{
            console.log('User authentication!');
            return this.service.creteUserData(enteredEmail, enteredName, this.profileImage);
        })
        .then(()=>{
            console.log('User data uploaded to the forestore!');
            this.router.navigateByUrl('/login');
            console.log('New user successfully created!');
        })
        .catch(error=>{
          console.log(error);
        });
}
select($event:any){
  this.selectedImage=$event.target.files[0];
  }


}
