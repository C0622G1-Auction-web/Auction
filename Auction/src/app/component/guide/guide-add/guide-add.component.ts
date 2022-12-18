<<<<<<< HEAD
/*Create By QuangND
* Component create guide
* Create Date: 16/12/2022
* */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GuideService} from '../../../service/guide/guide.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ImgUrlGuideDto} from '../../../model/guide/img-url-guide';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {Guide} from '../../../model/guide/guide';
=======
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GuideService} from "../../../service/guide/guide.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {ImgUrlGuideDto} from "../../../model/guide/img-url-guide";
import {ImgUrlGuideService} from "../../../service/guide/img-url-guide.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ToastrService} from "ngx-toastr";
>>>>>>> 5d7f77c59acf7ddf622cf16a4ab0428f1f3e4ebe

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

  selectedImages: any[] = [];
  imgCreate: any[]=[];
  messageCreate: String;
  id: number;

  // tslint:disable-next-line:variable-name
  constructor(private _guideService: GuideService,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder,
<<<<<<< HEAD
              // tslint:disable-next-line:variable-name
              private _storage: AngularFireStorage,
              // tslint:disable-next-line:variable-name
              private _activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.guideForm = this._formBuilder.group({
      title: [''],
      content: ['']
    });
  }

  craeteGuide() {
    this._guideService.create(this.guideForm.value).subscribe(data => {
      console.log(data);
      if (this.selectedImages.length !== 0) {
        // tslint:disable-next-line:prefer-for-of
=======
              private _storage:AngularFireStorage,
              private _imgUrlGuideService: ImgUrlGuideService,
              private _activatedRouter: ActivatedRoute,
              private _toastService: ToastrService) { }

  ngOnInit(): void {
    this.guideForm =this._formBuilder.group({
      title:['',[Validators.required,Validators.minLength(10),Validators.maxLength(100),Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9,.?! ]*$')]],
      content:['',[Validators.required, Validators.minLength(30),Validators.maxLength(1000)]]
    })
  }

  /*Fuction Create a guide
  @return a notification of successfull
  * */
  createGuide(){
    this._guideService.create(this.guideForm.value).subscribe(data => {
      this._toastService.success('Thêm mới hướng dẫn thành công', 'Create Guide!', {
          positionClass: 'toast-top-right',
          timeOut: 7000,
        }
      )
      if (this.imgCreate.length !== 0) {
        for (let i = 0; i < this.imgCreate.length; i++) {
          const image: ImgUrlGuideDto = {
            url: this.imgCreate[i],
            guideId: data.id
          };
          console.log(image);
          this._imgUrlGuideService.create(image).subscribe(() => {
            console.log('SUCCESS CREATE IMAGE')
          })
        }
      }
    });
  }

  /*Fuction show image load from user by firebase server cloud
  * */
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
    } else {
      this.selectedImages = [];
    }
    if (this.selectedImages.length !== 0) {
      setTimeout(()=>{
        this.messageCreate= "Đang tải ảnh vui lòng đợi......."
>>>>>>> 5d7f77c59acf7ddf622cf16a4ab0428f1f3e4ebe
        for (let i = 0; i < this.selectedImages.length; i++) {
          const selectedImage = this.selectedImages[i];
          const n = Date.now();
          const filePath = `RoomsImages/${n}`;
          const fileRef = this._storage.ref(filePath);
          this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
<<<<<<< HEAD
              fileRef.getDownloadURL().subscribe(urlx => {
                const image: ImgUrlGuideDto = {
                  url: urlx,
                  guideId: data.id
                };
                console.log(urlx);
                console.log(image);
                // this._imgUrlGuideService.create(image).subscribe(() => {
                //   console.log('SUCCESSFULLY CREATE')
                // });
=======
              fileRef.getDownloadURL().subscribe(url => {
                this.imgCreate.push(url);
                this.messageCreate="";
>>>>>>> 5d7f77c59acf7ddf622cf16a4ab0428f1f3e4ebe
              });
            })
          ).subscribe(() => {
          });
        }
      },3000)
      console.log(this.imgCreate)
    }
  }

<<<<<<< HEAD
  showPreview(event: any) {
    let newSelectedImages = [];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      newSelectedImages = event.target.files;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedImages.push(event.target.files[i]);
      }
    } else {
      this.selectedImages = [];
    }
    if (newSelectedImages.length !== 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < newSelectedImages.length; i++) {
        const selectedImage = newSelectedImages[i];
        const n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this._storage.ref(filePath);
        this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imgs.push(url);
              if (this.imgs.length === newSelectedImages.length) {
              }
            });
          })
        ).subscribe(() => {
        });
      }
      console.log(this.imgs);
    }
=======
  deleteImageNew(i: any) {
    this.imgCreate.splice(i, 1)
    console.log(i)
>>>>>>> 5d7f77c59acf7ddf622cf16a4ab0428f1f3e4ebe
  }

}
