import {Component,  OnInit} from '@angular/core';
import {FirebaseApp} from "@angular/fire";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chat} from "../../../model/chat/chat";
import {environment} from "../../../../environments/environment";
import firebase from "firebase";
import {v4 as uuidv4} from "uuid";
import Database = firebase.database.Database;
import initializeApp = firebase.initializeApp;
import {ToastrService} from "ngx-toastr";
import {ChatVisitorService} from "../../../service/chat/chat-visitor.service";


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
  chatInforVisitor: Chat;
  itemUser: String = '';
  check: number;

  constructor(private formBuilder: FormBuilder,
              private _toast: ToastrService,
              private _visitor: ChatVisitorService) {
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
    this.userchat = ['son', 'giang'];
    for (let i = 0; i < this.userchat.length ; i++) {
    const dbRef = firebase.database().ref('chat').child(this.userchat[i]);
      dbRef.once('value', (snapshot) => {
        const data = snapshot.val();
        for (let id in data) {
          this.chatInfor=data[id]
        }
        if(this.chatInfor.username!='admin') {
          this._toast.success('New Message From ' + this.chatInfor.username, 'receive',{
            timeOut: 1000
          })
        }
      })
    }
    for (let i = 1; i <= this._visitor.listVisitor().length ; i++) {
      const checkList = this._visitor.listVisitor();
      const dbRef = firebase.database().ref('chat').child('khach').child(checkList[1]);
      dbRef.once('value', (snapshot) => {
        const data = snapshot.val();
        for (let id in data) {
          this.chatInforVisitor=data[id]
        }
        if(this.chatInforVisitor.username!='admin') {
          this._toast.success('New Message From visitor ' + this.chatInforVisitor.username, 'receive',{
            timeOut: 1000
          })
        }
      })
    }
    // @ts-ignore
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
    console.log(this._visitor.listVisitor())
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
