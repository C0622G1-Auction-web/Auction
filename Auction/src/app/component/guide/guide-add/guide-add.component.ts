import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GuideService} from "../../../service/guide/guide.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {ImgUrlGuideDto} from "../../../model/guide/img-url-guide";
import {ImgUrlGuideService} from "../../../service/guide/img-url-guide.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  imgCreate: any[]=[];
  messageCreate: String;
  id: number;
  public Editor = ClassicEditor;
  constructor(private _guideService:GuideService,
              private _formBuilder: FormBuilder,
              private _storage:AngularFireStorage,
              private _imgUrlGuideService: ImgUrlGuideService,
              private _activatedRouter: ActivatedRoute,
              private _toastService: ToastrService) { }

  ngOnInit(): void {
    this.guideForm =this._formBuilder.group({
      title:['',[Validators.required,Validators.minLength(10),Validators.maxLength(100),Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9,.?! ]*$')]],
      content:['',[Validators.required, Validators.minLength(30),Validators.maxLength(2000)]]
    })
  }

  /*Fuction Create a guide
  @return a notification of successfull
  * */
  createGuide(){
    this._guideService.create(this.guideForm.value).subscribe(data => {
      this._toastService.success('Thêm mới hướng dẫn thành công', 'Create Guide!', {
        positionClass: 'toast-bottom-right',
          timeOut: 4000,
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
        for (let i = 0; i < this.selectedImages.length; i++) {
          let selectedImage = this.selectedImages[i];
          const n = Date.now();
          const filePath = `RoomsImages/${n}`;
          const fileRef = this._storage.ref(filePath);
          this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                this.imgCreate.push(url);
                this.messageCreate="";
              });
            })
          ).subscribe(() => {
          });
        }
      },3000)
      console.log(this.imgCreate)
    }
  }

  deleteImageNew(i: any) {
    this.imgCreate.splice(i, 1)
    console.log(i)
  }
}
