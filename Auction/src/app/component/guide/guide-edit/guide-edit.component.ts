import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GuideService} from "../../../service/guide/guide.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImgUrlGuideService} from "../../../service/guide/img-url-guide.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ImgUrlGuideDto} from "../../../model/guide/img-url-guide";
import {finalize} from "rxjs/operators";
import {Guide} from "../../../model/guide/guide";
import {ToastrService} from "ngx-toastr";
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

/*Create by QuangND
* Component of screen Edit a Guide
* Date Create 16/12/20222
* */
@Component({
  selector: 'app-guide-edit',
  templateUrl: './guide-edit.component.html',
  styleUrls: ['./guide-edit.component.css']
})
export class GuideEditComponent implements OnInit {
  public Editor = ClassicEditor;
  editGuideForm: FormGroup;
  guide: Guide;
  selectedImages: any[] = [];
  imgs: ImgUrlGuideDto[] = [];
  imgCreate: any[] = [];
  idImageList: number[] = [];
  messageCreate: String;
  id: number;

  constructor(private _guideService: GuideService,
              private _formBuilder: FormBuilder,
              private _storage: AngularFireStorage,
              private _imgUrlGuideService: ImgUrlGuideService,
              private _activatedRouter: ActivatedRoute,
              private _toastService: ToastrService) {
  }

  ngOnInit(): void {
    this._activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get("id")
      this._imgUrlGuideService.getListImage(this.id).subscribe(data => {
        console.log(data)
        this.imgs = data;
      })
    })
    this._guideService.getGuideById(this.id).subscribe(data => {
      console.log(data)
      this.editGuideForm = this._formBuilder.group({
        id: [data.id],
        title: [data.title, [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9,.?! ]*$')]],
        content: [data.content, [Validators.required, Validators.minLength(30), Validators.maxLength(2000)]]
      })
    })
  }

  /*Fuction update a guide
  @return a notification successfull update
  * */
  updateGuide() {
    if (this.editGuideForm.valid) {
      this.guide = this.editGuideForm.value;
      console.log(this.editGuideForm.value)
      this._guideService.update(this.guide).subscribe(data => {
        this._toastService.success('Cập nhật hướng dẫn thành công', 'Update Guide!', {
            positionClass: 'toast-bottom-right',
            timeOut: 4000,
          }
        )
        if (this.imgCreate.length !== 0) {
          for (let i = 0; i < this.imgCreate.length; i++) {
            const image: ImgUrlGuideDto = {
              url: this.imgCreate[i],
              guideId: this.guide.id
            };
            console.log(image);
            this._imgUrlGuideService.create(image).subscribe(() => {
              console.log('SUCCESSFULLY CREATE');
            })
          }
        }
      })
      if (this.idImageList.length !== 0) {
        for (let j = 0; j < this.idImageList.length; j++) {
          console.log(this.idImageList[j])
          this.deleteImageById(this.idImageList[j])
        }
      }
    }
  }
  /*Function loading image and show image of guide using firebas storage
  * */
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
    } else {
      this.selectedImages = [];
    }
    console.log(this.selectedImages);
    if (this.selectedImages.length !== 0) {
      setTimeout(() => {
        this.messageCreate = "Đang tải ảnh vui lòng đợi......."
        for (let i = 0; i < this.selectedImages.length; i++) {
          let selectedImage = this.selectedImages[i];
          const n = Date.now();
          const filePath = `RoomsImages/${n}`;
          const fileRef = this._storage.ref(filePath);
          this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                this.imgCreate.push(url);
                this.messageCreate = "";
              });
            })
          ).subscribe(() => {
          });
        }
      }, 3000)
    }
    console.log(this.imgCreate)
  }

  /*
  * Fuction delete image exist temporary
  * */
  deleteImage(i: number, item: ImgUrlGuideDto) {
    this.idImageList.push(item.id);
    this.imgs.splice(i, 1);
    console.log(item);
  }

  /*
* Fuction delete  new image  temporary
* */
  deleteImageNew(i: number) {
    this.imgCreate.splice(i, 1)
    console.log(i)
  }

  /*
  * Fuction delete image in database*/
  deleteImageById(id: number) {
    this._imgUrlGuideService.delete(id).subscribe(data => {
    });
  }

  resetEditForm() {
    this.ngOnInit();
  }
}
