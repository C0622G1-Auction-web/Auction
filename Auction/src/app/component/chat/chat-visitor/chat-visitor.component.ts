/*Create by QuangND
Component for chat of visitor in web
Create date 21/12/2022
* */

import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import {FirebaseApp} from "@angular/fire";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chat} from "../../../model/chat/chat";
import Database = firebase.database.Database;
import {v4 as uuidv4} from "uuid";
import {environment} from "../../../../environments/environment";
import initializeApp = firebase.initializeApp;
import {ChatVisitorService} from "../../../service/chat/chat-visitor.service";
@Component({
  selector: 'app-chat-visitor',
  templateUrl: './chat-visitor.component.html',
  styleUrls: ['./chat-visitor.component.css']
})
export class ChatVisitorComponent implements OnInit {

  title = 'firechat';
  app: FirebaseApp;
  db: Database;
  form: FormGroup;
  idVisitor:string;
  username = 'Khách';
  message = '';
  chats: Chat[] = [];
  constructor(private formBuilder: FormBuilder,) {
    this.app = initializeApp(environment.firebaseConfig);
    this.form = this.formBuilder.group({
      'message': ['', [Validators.required]],
      'username': ['Khách']
    });
  }

  ngOnInit(): void {
    const idVisitor= uuidv4();
    this.idVisitor= idVisitor.toString();
    const dbRef = firebase.database().ref('chat').child('khach').child(idVisitor);
    dbRef.on('value', (snapshot: any) => {
      this.chats = [];
      const data = snapshot.val();
      for (let id in data) {
        this.chats.push(data[id])
      }
      this.autoScroll();
    })
  }

  onChatSubmit(form: any) {
    const chat = form;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();
    this.chats = [];
    firebase.database().ref('chat/khach/'+this.idVisitor).push(chat);
    console.log(this.chats)
    this.form = this.formBuilder.group({
      'message': ['', [Validators.required]],
      'username': [chat.username],
    });
    this.heiht();
    this.autoScroll();

  }
  openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  /*Hàm Đóng Form*/
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  autoScroll() {
    setTimeout(function () {
      document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    }, 300)
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
