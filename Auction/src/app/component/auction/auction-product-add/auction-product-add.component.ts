import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';

import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs/operators';
import {Category} from 'src/app/model/product/category';
import {ImgUrlProductDto} from 'src/app/model/product/dto/img-url-product-dto';
import {ProductDto} from 'src/app/model/product/dto/product-dto';
import {PriceStep} from 'src/app/model/product/price-step';
import {Product} from 'src/app/model/product/product';
import {User} from 'src/app/model/user/user';
import {CategoryService} from 'src/app/service/product/category.service';
import {ImageProductService} from 'src/app/service/product/image-product.service';
import {PriceStepService} from 'src/app/service/product/price-step.service';
import {ProductService} from 'src/app/service/product/product.service';
import {UserService} from 'src/app/service/user/user.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const checkStartTime: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startTime = new Date(control.get("startTime").value).getTime();
  const dateNow = new Date().getTime();
  if (startTime - dateNow < 0) {
    return {"checkStartTime": true};
  } else {
    return null;
  }
}

export const checkEndTime: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startTime = new Date(control.get("startTime").value).getTime();
  console.log(startTime)
  const endTime = new Date(control.get("endTime").value).getTime();
  console.log(endTime)
  if (endTime - startTime > 30 * 24 * 60 * 60 && startTime && endTime || endTime - startTime < 0) {
    return {"checkEndTime": true};
  } else {
    return null;
  }
}

@Component({
  selector: 'app-auction-product-add',
  templateUrl: './auction-product-add.component.html',
  styleUrls: ['./auction-product-add.component.css']
})
export class AuctionProductAddComponent implements OnInit {

  public Editor = ClassicEditor;

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  product: Product;
  productDto: ProductDto;
  categoryList: Category[] = [];
  priceStepList: PriceStep[] = [];
  formCreateProduct: FormGroup;
  userFind: User;
  userId: number;
  selectedImages: any[] = [];
  img: any[] = [];
  error: any;
  selectedFile: any[] = [];
  messageCreate = "";
  messageImage = "";

  constructor(private _formBuilder: FormBuilder,
              private _productService: ProductService,
              private _categoryService: CategoryService,
              private _priceStepService: PriceStepService,
              private _userService: UserService,
              private _storage: AngularFireStorage,
              private _imageProductService: ImageProductService,
              private _toast: ToastrService) {
  }

  ngOnInit(): void {
    this._categoryService.getListCategory().subscribe(data => {
      console.log('category', data);
      this.categoryList = data;
    })
    this._priceStepService.getListPriceStep().subscribe(data => {
      this.priceStepList = data;
    })
    this.formCreateProduct = this._formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern("^[A-Z][a-z]*([ ][A-Z][a-z]+)*$")]],
      description: ['', [Validators.required]],
      initialPrice: ['', [Validators.required, Validators.min(0), Validators.pattern("\\d+")]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      imageProduct: ['', [Validators.required]],
      registerDay: ['', [Validators.required]],
      priceStep: ['', [Validators.required]],
      category: ['', [Validators.required]],
      user: ['', [Validators.required]]
    }, {validators: [checkStartTime, checkEndTime]})
  };

  addNewProduct() {
    this.productDto = this.formCreateProduct.value;
    this._productService.addProduct(this.productDto).subscribe(data => {
        if (this.img.length !== 0) {
          for (let i = 0; i < this.img.length; i++) {
            const image: ImgUrlProductDto = {
              url: this.img[i],
              product: data.id
            };
            this._imageProductService.create(image).subscribe(() => {
            })
          }
        }
        this._toast.success("Chúc mừng bạn đã đấu giá thành công, đợi bộ phận kiểm duyệt xác nhận và thông báo bạn sau nhé !")
      },
      error => {
        this._toast.error("Yêu cầu của bạn không được duyệt, vui lòng nhập chính xác điều kiện đấu giá");
      });
  }

  findUserById(value) {
    this._userService.findUserById(value).subscribe(data => {
      this.userFind = data;
      this.formCreateProduct.patchValue({user: this.userFind.id})
      console.log(this.userFind)
    })
  }

  showPreview(event: any) {
    this.messageImage = "Đang tải ảnh vui lòng đợi một lát"
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files;
    } else {
      this.selectedFile = [];
    }
    console.log(this.selectedFile)
    if (this.selectedFile.length !== 0) {
      for (let i = 0; i < this.selectedFile.length; i++) {
        let selectedImage = this.selectedFile[i];
        const n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this._storage.ref(filePath);
        this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.messageImage = "";
              this.img.push(url);
              console.log(url);
            });
          })
        ).subscribe(() => {
        });
      }
    }
  }

  deleteImageNew(index) {
    this.img.splice(index, 1)
    this._toast.error("Bạn đã xóa 1 ảnh!")
  }

  resetFindUserById(testNum) {
    testNum.removeAttribute('disabled')
  }

  resetForm() {
    this.ngOnInit;
  }
}
