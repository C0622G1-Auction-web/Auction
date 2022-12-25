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
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {finalize} from "rxjs/operators";
import {ImgUrlProduct} from "../../../model/product/img-url-product";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImageProductService} from "../../../service/product/image-product.service";
import {ImgUrlProductDto} from "../../../model/product/dto/img-url-product-dto";
import {ProductDto} from "../../../model/product/dto/product-dto";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

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
  initialPrice: any;
  readFile: any[] = [];

  constructor(private _formBuilder: FormBuilder,
              private _productService: ProductService,
              private _categoryService: CategoryService,
              private _priceStepService: PriceStepService,
              private _userService: UserService,
              private _storage: AngularFireStorage,
              private _imageProductService: ImageProductService,
              private _toast: ToastrService,
              private titleService: Title,
              private _route: Router) {
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
    if (this.formCreateProduct.valid && this.userFind != null) {
      this.formCreateProduct.patchValue({user: this.userFind.id})
      this.productDto = this.formCreateProduct.value;
      console.log(this.formCreateProduct.value)
      for (let i = 0; i < this.readFile.length; i++) {
        let selectedImage = this.readFile[i];
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
      setTimeout(() => {
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
          this._route.navigateByUrl("/products");
        });
      }, 2000)
    } else {
      this._toast.error("Thêm mới sản phẩm thất bại!");
    }
  }

  findUserByAccount(testNum) {
    testNum.setAttribute('disabled', true);
    this._userService.findUserByAccount(testNum.value).subscribe(data => {
      this.userFind = data;
      this.formCreateProduct.patchValue({user: this.userFind.account.username})
      this.checkUser = "Mã người đăng: " + this.userFind.id + "\n" + "Tên người đăng: " + this.userFind.firstName + " " + this.userFind.lastName;
    }, error => {
      this.userFind = null;
      this.checkUser = "Không tìm thấy thông tin người đăng!"
    })
  }

  showPreview(event: any) {
    this.messageCreate = '';
    let files = event.target.files;
    this.readFile = event.target.files;
    if ((files.length + this.selectedFile.length) < 6) {
      for (let file of files) {
        if (file.size > 1048576) {
          this.messageCreate = 'Dung lượng ảnh vượt quá 1Mb';
          this.formCreateProduct.patchValue({imageProduct: []})
          this.selectedFile = [];
          break;
        }
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFile.push(e.target.result);
          console.log(this.selectedFile)
        }
        reader.readAsDataURL(file);
      }
    } else {
      this.messageCreate = "Vui lòng không chọn quá 5 ảnh.";
      this.formCreateProduct.patchValue({imageProduct: []})
      this.selectedFile = [];
    }
  }

  deleteImageNew(index) {
    if (this.selectedFile.length == 1) {
      this.selectedFile.splice(index, 1);
      this._toast.error("Bạn đã xóa 1 ảnh!");
      this.formCreateProduct.controls["imageProduct"].setValue([]);
    } else {
      this.selectedFile.splice(index, 1);
      this._toast.error("Bạn đã xóa 1 ảnh!");
    }
  }

  resetFindUserById(testNum) {
    testNum.removeAttribute('disabled');
  }


  private getFormCreate() {
    this.formCreateProduct = this._formBuilder.group({
      id: [],
      name: ["", [Validators.required, Validators.maxLength(255)]],
      description: ["", [Validators.required]],
      initialPrice: ["", [Validators.required, Validators.pattern('\\d+')]],
      startTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
      imageProduct: ["", [Validators.required]],
      registerDay: [],
      priceStep: ["", [Validators.required]],
      category: ["", [Validators.required]],
      user: ["", [Validators.required]]
    }, {validators: [checkStartTime, checkEndTime]});
  }

  resetForm(file) {
    this.ngOnInit();
    this.selectedFile = [];
    file.value = "";
    this.checkUser = "";
    this.messageCreate = '';
  }
}
