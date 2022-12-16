/*Create By QuangND
* Component edit guide
* Create Date: 16/12/2022*/

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GuideService} from "../../../service/guide/guide.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImgUrlGuideService} from "../../../service/guide/img-url-guide.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ImgUrlGuideDto} from "../../../model/guide/img-url-guide";

@Component({
  selector: 'app-guide-edit',
  templateUrl: './guide-edit.component.html',
  styleUrls: ['./guide-edit.component.css']
})
export class GuideEditComponent implements OnInit {
  editGuideForm: FormGroup;
  selectedImages: any[] = [];
  imgs: ImgUrlGuideDto[] = [];
  imgUrl:String[]=[];
  id:number;
  constructor(private _guideService:GuideService,
              private _formBuilder: FormBuilder,
              private _storage:AngularFireStorage,
              private _imgUrlGuideService: ImgUrlGuideService,
              private _activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRouter.paramMap.subscribe((paramMap:ParamMap)=>{
      this.id=+paramMap.get("id")
      this._imgUrlGuideService.getlistImage(this.id).subscribe(data=>{
        console.log(data)
        this.imgs=data;
        if(this.imgs.length>0){
          for (let i = 0; i < this.imgs.length ; i++) {
            this.imgUrl.push(this.imgs[i].url)
          }
        }
      })
    })
    this._guideService.getGuideById(this.id).subscribe(data=>{
      this.editGuideForm= this._formBuilder.group({
        id:[data.id],
        title:[data.title],
        content:[data.content]
      })
    })
  }

  updateGuide() {

  }
}
