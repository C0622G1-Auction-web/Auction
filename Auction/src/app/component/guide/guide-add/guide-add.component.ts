import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GuideService} from "../../../service/guide/guide.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {ImgUrlGuideDto} from "../../../model/guide/img-url-guide";
import {ImgUrlGuideService} from "../../../service/guide/img-url-guide.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {toBase64String} from "@angular/compiler/src/output/source_map";
import set = Reflect.set;

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
  imgCreate: any[] = [];
  messageCreate: string = '';
  readImage: any[] = [];
  id: number;
  public Editor = ClassicEditor;

  constructor(private _guideService: GuideService,
              private _formBuilder: FormBuilder,
              private _storage: AngularFireStorage,
              private _imgUrlGuideService: ImgUrlGuideService,
              private _activatedRouter: ActivatedRoute,
              private _toastService: ToastrService,
              private _route: Router) {
  }

  ngOnInit(): void {
    this.guideForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9,.?! ]*$')]],
      content: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(2000)]]
    })
  }

  /*Fuction Create a guide
  @return a notification of successfull
  * */
  createGuide() {
    if (this.selectedImages.length !== 0) {
      for (let i = 0; i < this.readImage.length; i++) {
        let selectedImage = this.readImage[i];
        const n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this._storage.ref(filePath);
        this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imgCreate.push(url);
            });
          })
        ).subscribe(() => {
        });
      }
      console.log(this.imgCreate)
    }
    setTimeout(() => {
      this._guideService.create(this.guideForm.value).subscribe(data => {
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
        console.log(this.imgCreate)
        this._toastService.success('Thêm mới hướng dẫn thành công', 'Create Guide!', {
            positionClass: 'toast-bottom-right',
            timeOut: 2000,
          }
        )
        this._route.navigateByUrl('/guide');
      });
    }, 1000)
  }

  /*Fuction show image load from user by firebase server cloud
  * */
  showPreview(event: any) {
    this.messageCreate = '';
    let files = event.target.files;
    this.readImage = files;
    if ((files.length+this.selectedImages.length) < 6) {
      for (let file of files) {
        if (file.size > 1048576) {
          this.messageCreate = 'Dung lượng ảnh vượt quá 1Mb.';
          this.selectedImages = [];
          break;
        }
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push(e.target.result);
          console.log(this.selectedImages)
        }
        reader.readAsDataURL(file);
      }
    } else {
      this.messageCreate = "Vui lòng không chọn quá 5 ảnh.";
      this.selectedImages=[];
    }
  }

  deleteImageNew(i: any) {
    this.selectedImages.splice(i, 1)
    console.log(i)
  }

  resetForm() {
    this.ngOnInit();
    this.messageCreate='';
    this.selectedImages = [];
  }
}
