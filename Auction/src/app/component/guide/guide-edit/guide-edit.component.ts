import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GuideService} from "../../../service/guide/guide.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImgUrlGuideService} from "../../../service/guide/img-url-guide.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ImgUrlGuideDto} from "../../../model/guide/img-url-guide";
import {finalize} from "rxjs/operators";
import {Guide} from "../../../model/guide/guide";
import {ToastrService} from "ngx-toastr";
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
  messageCreate: string='';
  id: number;
  readImage:any[];

  constructor(private _guideService: GuideService,
              private _formBuilder: FormBuilder,
              private _storage: AngularFireStorage,
              private _imgUrlGuideService: ImgUrlGuideService,
              private _activatedRouter: ActivatedRoute,
              private _toastService: ToastrService,
              private _route: Router) {
  }

  ngOnInit(): void {
    this._activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get("id")
      this._imgUrlGuideService.getListImage(this.id).subscribe(data => {
        console.log(data)
        this.imgs = data;
      },error => {
        this._toastService.success('Không tìm thấy dữ liệu', 'Update image Guide!', {
          positionClass: 'toast-top-right',
          timeOut: 3000,
        })
        this._route.navigateByUrl('/guide')
      })
    })
    this._guideService.getGuideById(this.id).subscribe(data => {
      console.log(data)
      this.editGuideForm = this._formBuilder.group({
        id: [data.id],
        title: [data.title, [Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9,.?! ]*$')]],
        content: [data.content, [Validators.required, Validators.minLength(30), Validators.maxLength(2000)]]
      })
    }, error => {
      this._toastService.success('Không tìm thấy dữ liệu', 'Update Guide!', {
        positionClass: 'toast-bottom-right',
        timeOut: 3000,
      })
      this._route.navigateByUrl('/guide')
    })
  }

  /*Fuction update a guide
  @return a notification successfull update
  * */
  updateGuide() {
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
              this.messageCreate = "";
            });
          })
        ).subscribe(() => {
        });
      }
    }
    setTimeout(()=>{
      if (this.editGuideForm.valid) {
        this.guide = this.editGuideForm.value;
        console.log(this.editGuideForm.value)
        this._guideService.update(this.guide).subscribe(data => {
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
          this._toastService.success('Cập nhật hướng dẫn thành công', 'Update Guide!', {
              positionClass: 'toast-bottom-right',
              timeOut: 3000,
            }
          )
          this._route.navigateByUrl("/guide")
        })
        if (this.idImageList.length !== 0) {
          for (let j = 0; j < this.idImageList.length; j++) {
            console.log(this.idImageList[j])
            this.deleteImageById(this.idImageList[j])
          }
        }
      }
    },1000)
  }

  /*Function loading image and show image of guide using firebas storage
  * */
  showPreview(event: any) {
    this.messageCreate = '';
    let files = event.target.files;
    this.readImage = files;
    if ((files.length+this.selectedImages.length+this.imgs.length) < 6) {
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
    this.selectedImages.splice(i, 1)
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
    this.selectedImages = [];
    this.messageCreate='';
  }

}
