import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {GuideService} from "../../../service/guide/guide.service";
import {Guide} from "../../../model/guide/guide";

@Component({
  selector: 'app-guide-add',
  templateUrl: './guide-add.component.html',
  styleUrls: ['./guide-add.component.css']
})

/*Create by QuangND
* Component of screen Create  Guide
* Date Create 15/12/20222
* */
export class GuideAddComponent implements OnInit {
  guideForm: FormGroup;
  newGuide: Guide;
  downloadURL: Observable<string>;
  constructor(private _guideService:GuideService,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.guideForm =this._formBuilder.group({
      title:[''],
      content:['']
    })
  }
    createGuide(){
this._guideService.create(this.guideForm.value).subscribe(data=>{
  console.log("success")
})
    }
}
