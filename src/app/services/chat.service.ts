import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {orderBy, serverTimestamp} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private store:AngularFirestore, private authService:AuthService, private imageStore:AngularFireStorage) {}

  public userStoreId='';
  public outgoingMsg:any;
  public users=[];
  public enteredEmail:any;
  /*public profileImage:any;*/
  public currnetUserEmail:any=this.authService.getToken('myToken');
  public currnetUserId:any;
  public selectedUserId:any;
  public selectedUserName:any;

  public createdChatId:any;
  public exsistsChatId:any;
  public selectedChatId:any;

  public imageUrl:any;


  public selectedUsersEmail=[];
  formatDateTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  creteUserData(email:any, userName:any,profileUrl:any):Promise<any>{
    let id =this.store.createId();
    this.userStoreId=id;
    return this.store.doc(`users/${id}`).set({
      email,
      userName,
      profileUrl,
      id
    });
  }
  creteChatData(message:any, date:Date):Promise<any>{
    let chatId =this.createdChatId;
    return this.store.doc(`usersChat/${chatId}`).set({
      message,
      date:this.formatDateTime(date),
      chatId,
      createdAt:serverTimestamp()
    });
  }
  createMsg(message:any, date:Date):Promise<any>{
    let id =this.store.createId();
    return this.store.doc(`usersChat/${this.selectedChatId}/messages/${this.currnetUserId}/userMessages/${id}`).set({
      message,
      date:this.formatDateTime(date),
      createdAt:serverTimestamp()
    });
  }
  chatRoomIsExists():Observable<any>{
    return this.store.collection(`usersChat`).valueChanges();
  }
  getUserData(id:string):Observable<any>{
    return this.store.doc(`users/${id}`).valueChanges({idField:'id'});
  }
  getAllUsers():Observable<any>{
    return this.store.collection(`users`).valueChanges();
  }
  getmessages(idCombined:string, idUser:string):Observable<any>{
    return this.store.collection(`usersChat/${idCombined}/messages/${idUser}/userMessages`).valueChanges();
  }
  uploadImg(email:string, path:string){
    return this.imageStore.upload(`images/${email}`,path);
  }
  getImageUrl(email:string):Observable<any>{
    return this.imageStore.ref(`images/${email}`).getDownloadURL();
  }
  /*getCurrentUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      this.currnetUserEmail = user.email;
    }
  }*/
}
