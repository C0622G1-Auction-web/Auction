import {Component, OnInit} from '@angular/core';
import '@firebase/database';
import firebase from "firebase";
import Database = firebase.database.Database;
import initializeApp = firebase.initializeApp;
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FirebaseApp} from "@angular/fire";
import {v4 as uuidv4} from "uuid";
import {Chat} from "../../../model/chat/chat";
import {environment} from "../../../../environments/environment";
import {User} from "../../../model/user/user";
import {TokenService} from "../../../service/security/token.service";
import {Account} from "../../../model/account/account";

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {

  title = 'firechat';
  app: FirebaseApp;
  db: Database;
  form: FormGroup;
  username = '';
  message = '';
  chats: Chat[] = [];
  currentUser: User;
  nameUser: string;
  checkLogged = false;
  accountRole: string;
  currentAccount: Account;

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.app = initializeApp(environment.firebaseConfig);
    this.form = this.formBuilder.group({
      'message': ['', [Validators.required]],
      'username': ['']
    });
  }

  onChatSubmit(form: any) {
    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();
    this.chats = [];
    firebase.database().ref('/chat/' + this.username).push(chat);
    this.form = this.formBuilder.group({
      'message': ['', [Validators.required]],
      'username': [this.username],
    });
    this.heiht();
    this.autoScroll();

  }

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.checkLogged = true;

      const roles = this.tokenService.getRole();

      for (let i = 0; i < roles.length; i++) {

        if (roles[i] === 'ROLE_ADMIN') {
          this.accountRole = 'ROLE_ADMIN'
        }
      }
      this.currentUser = JSON.parse(this.tokenService.getUser());
      this.nameUser = this.currentUser.lastName + ' ' + this.currentUser.firstName;
      this.currentAccount = JSON.parse(this.tokenService.getAccount());
      this.username = this.currentAccount.username;


    }
    this.form = this.formBuilder.group({
      'message': ['', [Validators.required]],
      'username': [this.username]
    });

    const dbRef = firebase.database().ref('/chat/' + this.username);
    dbRef.on('value', (snapshot: any) => {
      this.chats = [];
      const data = snapshot.val();
      for (let id in data) {
        this.chats.push(data[id])
        console.log(this.chats)
      }
      this.autoScroll();
    })
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
    this.autoScroll();
  }

  /*Hàm Đóng Form*/
  closeForm() {
    document.getElementById("myForm").style.display = "none";
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
}
