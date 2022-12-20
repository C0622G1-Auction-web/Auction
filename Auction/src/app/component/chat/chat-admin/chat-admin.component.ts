import {Component, OnInit} from '@angular/core';
import {FirebaseApp} from "@angular/fire";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chat} from "../../../model/chat/chat";
import {environment} from "../../../../environments/environment";
import firebase from "firebase";
import {v4 as uuidv4} from "uuid";
import Database = firebase.database.Database;
import initializeApp = firebase.initializeApp;
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../service/user/user.service";


@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent implements OnInit {

  userchat: string[] = [];
  title = 'firechat';
  app: FirebaseApp;
  db: Database;
  form: FormGroup;
  username = 'admin';
  message = '';
  chats: Chat[] = [];
  chatInfor: Chat;
  itemUser: string = '';
  check: number;
  // userNamejs: string[];

  constructor(private formBuilder: FormBuilder,
              private _toast: ToastrService,
              // private _visitor: ChatVisitorService,
              private _userService:UserService) {
    this.app = initializeApp(environment.firebaseConfig);
    this.form = this.formBuilder.group({
      'message': ['', [Validators.required]],
      'username': ['admin']
    });
  }

  onChatSubmit(form: any) {
    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();
    this.chats = [];
    firebase.database().ref('chat').child(this.itemUser.toString()).push(chat);
    console.log(this.chats)
    this.form = this.formBuilder.group({
      'message': ['', [Validators.required]],
      'username': [chat.username],
    });
    this.autoScroll();
    this.heiht();

  }

  ngOnInit(): void {
    // document.querySelectorAll('li').forEach(value => {
    //   this.userNamejs.push(value.innerText);
    // })
    // console.log(this.userNamejs);
    this.userchat = ['son', 'giang'];
    this._userService.getAllUserChat().subscribe(data=>{
      for (let i = 0; i < data.length ; i++) {
        this.userchat.push(data[i].account.username)
      }
      console.log('user chat: ', this.userchat);
      for (let i = 0; i < this.userchat.length ; i++) {
        const dbRef = firebase.database().ref('/chat/'+this.userchat[i]);
        dbRef.once('value', (snapshot) => {
          const data = snapshot.val();
          for (let id in data) {
            this.chatInfor=data[id]
          }
          console.log('chat info', this.chatInfor);
          if(this.chatInfor != undefined) {
            if(this.chatInfor?.username!='admin') {
              this._toast.success('New Message From ' + this.chatInfor.username, 'receive',{
                timeOut: 1000
              });
            }
          }
        })
      }
    }, error => {
      alert('loi')
    })
    console.log(this.userchat);
    for (let i = 0; i < this.userchat.length ; i++) {
      const dbRef = firebase.database().ref('chat').child(this.userchat[i]);
      dbRef.once('value', (snapshot) => {
        const data = snapshot.val();
        for (let id in data) {
          this.chatInfor=data[id]
        }
        if(this.chatInfor.username!='admin') {
          this._toast.success('New Message From ' + this.chatInfor.username, 'receive',{
            timeOut: 2000
          })
        }
      })
    }
    const dbb =firebase.database().ref('chat/khach');
    dbb.once('value',(snapshot)=>{
      const data=snapshot.val()
      console.log(data)
    })
  }

  autoScroll() {
    setTimeout(function () {
      document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    }, 100)
  }

  heiht() {
    setTimeout(function () {
      document.querySelectorAll("textarea").forEach(value => {
        console.log('height', value.scrollHeight);
        value.setAttribute("style", "height:" + value.scrollHeight + "px;overflow-y:hidden;");
      });
    });
  }

  chooseUser(item: string) {
    this.chats = [];
    this.itemUser = item;
    for (let i = 0; i < this.userchat.length; i++) {
      if (item === this.userchat[i]) {
        this.check = i;
        break
      }
    }
    console.log(this.userchat[this.check])
    console.log(item);
    console.log(this.itemUser)
    const dbRef = firebase.database().ref('chat');
    dbRef.on('value', (snapshot) => {
      this.chats = [];
      const data = snapshot.child(item).val();
      for (let id in data) {
        this.chats.push(data[id])
      }
      this.autoScroll();
      this.heiht();
      this.itemUser = item;
      console.log(this.chats)
    })
  }
}
