/*Create By QuangND
* Component create guide
* Create Date: 16/12/2022
* */

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GuideService} from "../../../service/guide/guide.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {ImgUrlGuideDto} from "../../../model/guide/img-url-guide";
import {ActivatedRoute, ParamMap} from "@angular/router";

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
  selectedImages: any[] = [];
  imgs: any[] = [];
  id: number;
  constructor(private _guideService:GuideService,
              private _formBuilder: FormBuilder,
              private _storage:AngularFireStorage,
              private _activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.guideForm =this._formBuilder.group({
      title:[''],
      content:['']
    })
  }
  craeteGuide(){
    this._guideService.create(this.guideForm.value).subscribe(data => {
      console.log(data)
      if (this.selectedImages.length !== 0) {
        for (let i = 0; i < this.selectedImages.length; i++) {
          let selectedImage = this.selectedImages[i];
          const n = Date.now();
          const filePath = `RoomsImages/${n}`;
          const fileRef = this._storage.ref(filePath);
          this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                const image: ImgUrlGuideDto = {
                  url: url,
                  guideId: data.id
                };
                console.log(url);
                console.log(image);
                // this._imgUrlGuideService.create(image).subscribe(() => {
                //   console.log('SUCCESSFULLY CREATE')
                // });
              });
            })
          ).subscribe();
        }
      }
    });
  }

  showPreview(event: any) {
    let newSelectedImages = [];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      newSelectedImages = event.target.files;
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedImages.push(event.target.files[i]);
      }
    } else {
      this.selectedImages = [];
    }
    if (newSelectedImages.length !== 0) {
      for (let i = 0; i < newSelectedImages.length; i++) {
        let selectedImage = newSelectedImages[i];
        const n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this._storage.ref(filePath);
        this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imgs.push(url);
              if (this.imgs.length == newSelectedImages.length) {
              }
            });
          })
        ).subscribe(() => {
        });
      }
      console.log(this.imgs)
    }
  }
}
