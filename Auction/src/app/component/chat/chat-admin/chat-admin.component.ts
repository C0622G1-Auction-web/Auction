import {Component, OnInit} from '@angular/core';
import {FirebaseApp} from "@angular/fire";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chat} from "../../../model/chat/chat";
import {environment} from "../../../../environments/environment";
import firebase from "firebase";
import {v4 as uuidv4} from "uuid";
import Database = firebase.database.Database;
import initializeApp = firebase.initializeApp;


@Component({
  selector: 'app-chat-admin',
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent implements OnInit {

  title = 'firechat';
  app: FirebaseApp;
  db: Database;
  form: FormGroup;
  username = 'admin';
  message = '';
  chats: Chat[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.app = initializeApp(environment.firebaseConfig);
    this.form = this.formBuilder.group({
      'message': ['',[Validators.required]],
      'username': ['admin']
    });
  }

  onChatSubmit(form: any) {
    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();
    this.chats=[];
    firebase.database().ref('chat').push(chat);
    console.log(this.chats)
    this.form = this.formBuilder.group({
      'message': ['',[Validators.required]],
      'username': [chat.username],
    });
    this.autoScroll();
    this.heiht();

  }
  ngOnInit(): void {
    const dbRef = firebase.database().ref('/chat');
    dbRef.on('value', (snapshot) => {
      this.chats=[];
      const data = snapshot.val();
      for (let id in data) {
        this.chats.push(data[id])
      }
      this.autoScroll();
      this.heiht();
      console.log(this.chats)
    })
  }

  autoScroll() {
    setTimeout(function () {
      document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    },100)
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
