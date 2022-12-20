import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';


import {ProductService} from '../../../service/product/product.service';
import {Product} from '../../../model/product/product';
import {CategoryService} from '../../../service/product/category.service';
import {PriceStepService} from '../../../service/product/price-step.service';
import {UserService} from '../../../service/user/user.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {PriceStep} from '../../../model/product/price-step';
import {Category} from '../../../model/product/category';
import {User} from '../../../model/user/user';
import {ClassicEditor} from '@ckeditor/ckeditor5-build-classic';
import {finalize} from "rxjs/operators";
import {ImgUrlProduct} from "../../../model/product/img-url-product";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImageProductService} from "../../../service/product/image-product.service";
import {ImgUrlProductDto} from "../../../model/product/dto/img-url-product-dto";
import {ProductDto} from "../../../model/product/dto/product-dto";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";

export const checkStartTime: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startTime = new Date(control.get("startTime").value).getTime();
  const dateNow = new Date().getTime();
  if (startTime - dateNow < 3 * 24 * 60 * 60 * 1000) {
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
  if (endTime - startTime > 30 * 24 * 60 * 60 * 1000 && endTime && startTime || endTime - startTime < 0) {
    return {"checkEndTime": true};
  } else {
    return null;
  }
}


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  editor = ClassicEditor;

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  messageCreate = "";
  product: Product;
  productDto: ProductDto;
  categoryList: Category[] = [];
  priceStepList: PriceStep[] = [];
  formCreateProduct: FormGroup;
  userFind: User;
  selectedFile: any[] = [];
  imgs: any[] = [];
  img: any[] = [];
  disabled: any;
  checkUser: string;
  text: string;
  listCheckImage: any[] = [];

  constructor(private _formBuilder: FormBuilder,
              private _productService: ProductService,
              private _categoryService: CategoryService,
              private _priceStepService: PriceStepService,
              private _userService: UserService,
              private _storage: AngularFireStorage,
              private _imageProductService: ImageProductService,
              private _toast: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle("Thêm sản phẩm")
  }

  ngOnInit(): void {

    this._categoryService.getListCategory().subscribe(data => {
      this.categoryList = data;
    })
    this._priceStepService.getListPriceStep().subscribe(data => {
      this.priceStepList = data;
    })
    this.getFormCreate();
  }

  addNewProduct() {
    if (this.formCreateProduct.valid && this.imgs.length != 0) {
      this.productDto = this.formCreateProduct.value;
      console.log(this.formCreateProduct.value)
      this._productService.save(this.productDto).subscribe(data => {
        if (this.imgs.length !== 0) {
          for (let i = 0; i < this.imgs.length; i++) {
            const image: ImgUrlProductDto = {
              url: this.imgs[i],
              product: data.id
            };
            this._imageProductService.create(image).subscribe(() => {
            })
          }
        }
        this._toast.success("Thêm mới sản phẩm thành công!");
      });
    } else {
      this._toast.error("Thêm mới sản phẩm thất bại!");
    }
  }

  findUserById(testNum) {
    testNum.setAttribute('disabled', true);
    this._userService.findUserById(testNum.value).subscribe(data => {
      this.userFind = data;
      this.formCreateProduct.patchValue({user: this.userFind.id})
    }, error => {
      this.checkUser = "Không tìm thấy thông tin người đăng!"
    })
  }

  showPreview(event: any) {
    this.messageCreate = "Đang tải ảnh vui lòng đợi........";
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files;
    }
    if (this.selectedFile.length !== 0) {
      for (let i = 0; i < this.selectedFile.length; i++) {
        let selectedImage = this.selectedFile[i];
        const n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this._storage.ref(filePath);
        this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.messageCreate = "";
              this.imgs.push(url);
            });
          })
        ).subscribe(() => {
        });
      }
    }
  }

  deleteImageNew(index) {
    this.imgs.splice(index, 1);
    this._toast.error("Bạn đã xóa 1 ảnh!")

  }

  resetFindUserById(testNum) {
    testNum.removeAttribute('disabled')
  }


  private getFormCreate() {
    this.formCreateProduct = this._formBuilder.group({
      id: [],
      name: ["", [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      description: ["", [Validators.required]],
      initialPrice: ["", [Validators.required, Validators.pattern('\\d+')]],
      startTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
      imageProduct: ["", [Validators.required]],
      registerDay: [],
      priceStep: ["", [Validators.required]],
      category: ["", [Validators.required]],
      user: ["", [Validators.required, Validators.pattern('\\d+')]]
    }, {validators: [checkStartTime, checkEndTime]});
  }

  // checkImage(event: any) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   this.selectedFile = event.target.files;
  //   for (let i = 0; i < this.selectedFile.length; i++) {
  //     const text = this.selectedFile[i].name.substring(this.selectedFile[i].name.lastIndexOf(".") + 1).toLocaleLowerCase()
  //     if (text == 'jpg' || text == 'png') {
  //     } else {
  //       this.text = "Chỉ hỗ trợ jpg hoặc png !"
  //     }
  //   }
  // }
}
