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
  chatInforVisitor: Chat;
  listChatInforVisitor: string[] = [];
  itemUser: string = '';
  check: number;
  checkUser: boolean;

  constructor(private formBuilder: FormBuilder,
              private _toast: ToastrService,
              private _userService: UserService) {
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
    if (this.checkUser) {
      firebase.database().ref('chat/user').child(this.itemUser.toString()).push(chat);
      console.log(this.chats)
    } else {
      firebase.database().ref('chat/khach').child(this.itemUser.toString()).push(chat);
      console.log(this.chats)
    }
    this.form = this.formBuilder.group({
      'message': ['', [Validators.required]],
      'username': [chat.username],
    });
    this.autoScroll();
    this.heiht();

  }

  ngOnInit(): void {
    this._userService.getAllUserChat().subscribe(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.userchat.push(data[i].account.username)
      }
      for (let i = 0; i < this.userchat.length; i++) {
        const dbRef = firebase.database().ref('chat/user').child(this.userchat[i]);
        dbRef.once('value', (snapshot) => {
          const data = snapshot.val();
          for (let id in data) {
            this.chatInfor = data[id]
            console.log(this.chatInfor)
          }
          if (this.chatInfor.username != undefined) {
            if (this.chatInfor.username != 'admin') {
              this._toast.success('New Message From ' + this.chatInfor.username, 'receive', {
                timeOut: 2000
              })
            }
          }
        })
      }
    }, error => {
      alert('loi')
    })
    console.log(this.userchat);
    const dbb = firebase.database().ref('chat/khach');
    dbb.once('value', (snapshot) => {
      const data = snapshot.val()
      for (let k in data) {
        this.listChatInforVisitor.push(k);
      }
      console.log(this.listChatInforVisitor)
    })
    for (let i = 0; i < this.listChatInforVisitor.length; i++) {
      const dbRef = firebase.database().ref('chat/khach').child(this.listChatInforVisitor[i]);
      dbRef.once('value', (snapshot) => {
        const data = snapshot.val();
        for (let id in data) {
          this.chatInforVisitor = data[id]
          console.log(this.chatInforVisitor.username)
        }
        if (this.chatInforVisitor.username != 'admin') {
          console.log(this.chatInforVisitor.username)
          this._toast.success('New Message From visitor ' + this.chatInforVisitor.username, 'receive', {
            timeOut: 3000
          })
        }
      })
    }
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
    for (let i = 0; i < this.listChatInforVisitor.length; i++) {
      if (item === this.listChatInforVisitor[i]) {
        this.check = i;
        break;
      }
    }
    console.log(this.userchat[this.check])
    console.log(item);
    console.log(this.itemUser)
    const dbRef = firebase.database().ref('chat/user');
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
      this.checkUser = true;
    })
  }

  chooseVisitor(item: string) {
    this.chats = [];
    this.itemUser = item;
    for (let i = 0; i < this.listChatInforVisitor.length; i++) {
      if (item === this.listChatInforVisitor[i]) {
        this.check = i;
        break;
      }
    }
    console.log(this.listChatInforVisitor[this.check])
    console.log(item);
    console.log(this.itemUser)
    const dbRef = firebase.database().ref('chat/khach');
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
      this.checkUser = false;
    })
  }
}
