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
  username = 'Giang';
  message = '';
  chats: Chat[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.app = initializeApp(environment.firebaseConfig);
    this.form = this.formBuilder.group({
      'message': ['', [Validators.required]],
      'username': ['Giang']
    });
    firebase.database().ref('chat/giang').remove();
  }

  onChatSubmit(form: any) {
    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();
    this.chats = [];
    firebase.database().ref('chat/giang').push(chat);
    console.log(this.chats)
    this.form = this.formBuilder.group({
      'message': ['', [Validators.required]],
      'username': [chat.username],
    });
    this.heiht();
    this.autoScroll();
  }

  ngOnInit(): void {
    const dbRef = firebase.database().ref('chat').child('giang');
    dbRef.on('value', (snapshot: any) => {
      this.chats = [];
      const data = snapshot.val();
      for (let id in data) {
        this.chats.push(data[id])
      }
      this.heiht();
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
