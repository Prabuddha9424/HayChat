import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../services/chat.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {AuthService} from "../../services/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  constructor(private service:ChatService, private authService:AuthService, private title:Title) {
  }
  chatForm=new FormGroup({
    textarea: new FormControl()
  })
  usersArr:Array<any> = [];
  outgoingMessages:any;
  incomingMessages:any;
  name = '';
  ngOnInit() {
    this.title.setTitle('HayChat | Chat');
    this.service.getAllUsers()
      .subscribe(response => {
        response.forEach((user: any) => {
          if (user.email == this.service.currnetUserEmail) {
            this.service.currnetUserId=user.id;
          }else {
            this.usersArr.push(user);
          }
        });
      }, error => {
        console.log(error);
      })
  }
  setVal():string{
    if(this.service.selectedUserName==null){
      return "";
    }
    return this.service.selectedUserName;
  }

  returnUserId(value1: any, value2:any): Promise<void> {
    this.service.selectedUserId = null;

    this.service.selectedUserName = null;
    this.service.createdChatId = null;

    this.service.exsistsChatId = null;
    this.service.selectedChatId = null;

    this.service.selectedUserId = value1;
    this.service.selectedUserName = value2;


    this.setVal();

    return new Promise<void>((resolve, reject) => {
      this.service.chatRoomIsExists().subscribe(response => {
        let chatRoomFound = false;
        response.forEach((chat: any) => {
          if ((chat.chatId == (this.service.selectedUserId + this.service.currnetUserId)) || (chat.chatId == (this.service.currnetUserId + this.service.selectedUserId))) {
            this.service.exsistsChatId = chat.chatId;
            this.service.selectedChatId = chat.chatId;
            chatRoomFound = true;
          }
        });
        if(!chatRoomFound){
          this.service.createdChatId = this.service.selectedUserId + this.service.currnetUserId;
          this.service.selectedChatId=this.service.createdChatId;
        }

        resolve(); // Resolve the promise when done
      }, error => {
        console.log(error);
        reject(error); // Reject the promise on error
      });
    });
  }

  createOrLoadChat(){
    console.log('currnetUserId = '+this.service.currnetUserId);
    console.log('selectedUserId = '+this.service.selectedUserId);

    console.log('exsistsChatId = '+this.service.exsistsChatId);
    console.log('createdChatId = '+this.service.createdChatId);
    console.log('selectedChatId = '+this.service.selectedChatId);

    if(this.service.exsistsChatId!=null){
      console.log('data exists');
      return;
    }else {
      this.service.creteChatData('',new Date())
        .then(response=>{
          console.log('data created');
        }).catch(error=>{
        console.log(error);
      });
    }
  }
  loadOutgoingChat(){
    console.log(this.service.selectedChatId);
    this.service.getmessages(this.service.selectedChatId,this.service.currnetUserId)
      .subscribe(response=>{
        this.outgoingMessages=response;
      }, error => {
        console.log(error);
      })
  }
  loadIncomingChat(){
    console.log(this.service.selectedChatId);
    this.service.getmessages(this.service.selectedChatId,this.service.selectedUserId)
      .subscribe(response=>{
        this.incomingMessages=response;
      }, error => {
        console.log(error);
      })
  }
  sendMessage(val:any){
    this.service.createMsg(val, new Date())
      .then(response=>{
        console.log(response);
        this.chatForm.get('textarea')?.setValue('');
        console.log('response');
      }).catch(error=>{
        console.log(error);
    });
  }

  createChat(value1: any, value2:any) {
    this.returnUserId(value1, value2)
      .then(() => {
        console.log('returnUserId() completed');
        return this.createOrLoadChat(); // Chain the execution of two() after returnUserId() completes
      })
      .then(()=>{
        console.log('outgoing msg');
        return this.loadOutgoingChat();
      })
      .then(()=>{
        console.log('incoming msg');
        return this.loadIncomingChat();
      })
      .catch(error => {
        console.log('Error in returnUserId():', error);
      });
  }
}
