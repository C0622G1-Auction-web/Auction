import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../../model/product/category";
import {PriceStep} from "../../../model/product/price-step";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../service/product/product.service";
import {CategoryService} from "../../../service/product/category.service";
import {PriceStepService} from "../../../service/product/price-step.service";
import {UserService} from "../../../service/user/user.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImageProductService} from "../../../service/product/image-product.service";
import {Product} from "../../../model/product/product";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ImgUrlProduct} from "../../../model/product/img-url-product";
import {finalize} from "rxjs/operators";
import {ImgUrlProductDto} from "../../../model/product/dto/img-url-product-dto";
import {ProductDto} from "../../../model/product/dto/product-dto";
import {checkStartTime} from "../product-add/product-add.component";
import {ToastrService} from "ngx-toastr";
import {checkEndTime} from "../product-add/product-add.component";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Title} from "@angular/platform-browser";
import {User} from "../../../model/user/user";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  editor = ClassicEditor;
  productDto: ProductDto;
  categoryList: Category[] = [];
  priceStepList: PriceStep[] = [];
  selectedFile: any[] = [];
  formEditProduct: FormGroup;
  productFind: Product;
  id: number;
  userFind: User;
  imgs: ImgUrlProduct[] = [];
  idImageList: any[] = [];
  imgCreate: any[] = [];
  checkUser = "";
  messageEdit = "";
  readFile: any[] = [];

  constructor(private _formBuilder: FormBuilder,
              private _productService: ProductService,
              private _categoryService: CategoryService,
              private _priceStepService: PriceStepService,
              private _userService: UserService,
              private _storage: AngularFireStorage,
              private _imageProductService: ImageProductService,
              private _activatedRoute: ActivatedRoute,
              private _toast: ToastrService,
              private titleService: Title,
              private _router: Router) {
    this.titleService.setTitle("Chỉnh sửa sản phẩm")
  }

  ngOnInit(): void {
    this.getListCategory();
    this.getListPriceStep();
    this.getFormEdit();
  }

  getFormEdit() {
    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get("id");
      this._productService.findById(this.id).subscribe(product => {
        this.productFind = product;
        console.log(product)
        this._userService.findUserByAccount(product.user.account.username).subscribe(user => {
          this.userFind = user;
          console.log(user)
          this.checkUser = "Mã người đăng: " + this.userFind.id + "\n" + "Tên người đăng: " + this.userFind.firstName + " " + this.userFind.lastName;
          this.formEditProduct.patchValue({user: this.userFind.account.username})
        });
        this._imageProductService.getListImgProductId(this.productFind.id).subscribe(value => {
          this.imgs = value;
        });
        this.formEditProduct = this._formBuilder.group({
          id: [product.id, [Validators.required]],
          name: [product.name, [Validators.required, Validators.maxLength(255)]],
          description: [product.description, [Validators.required]],
          initialPrice: [product.initialPrice, [Validators.required, Validators.pattern('\\d+')]],
          startTime: [product.startTime, [Validators.required]],
          endTime: [product.endTime, [Validators.required]],
          registerDay: [product.registerDay],
          priceStep: [product.priceStep.id],
          category: [product.category.id],
          reviewStatus: [product.reviewStatus.id],
          auctionStatus: [product.auctionStatus.id],
          user: [product.user.id, [Validators.required]],
          imageProduct: [1, [Validators.required]],
        }, {validators: [checkStartTime, checkEndTime]});
      }, error => {
        this._toast.error("Lỗi trang !")
      });
    });
  }

  getListCategory() {
    this._categoryService.getListCategory().subscribe(data => {
      this.categoryList = data;
    });
  }

  getListPriceStep() {
    this._priceStepService.getListPriceStep().subscribe(data => {
      this.priceStepList = data;
    });
  }

  findUserByAccount(testNum) {
    testNum.setAttribute('disabled', true);
    this._userService.findUserByAccount(testNum.value).subscribe(data => {
      this.userFind = data;
      this.formEditProduct.patchValue({user: this.userFind.account.username})
      this.checkUser = "Mã người đăng: " + this.userFind.id + "\n" + "Tên người đăng: " + this.userFind.firstName + " " + this.userFind.lastName;
    }, error => {
      this.userFind = null;
      this.checkUser = "Không tìm thấy thông tin người đăng!"
    });
  }

  showPreview(event: any) {
    this.messageEdit = '';
    let files = event.target.files;
    this.readFile = event.target.files;
    if ((files.length + this.imgs.length) < 6) {
      for (let file of files) {
        if (file.size > 1048576) {
          this.messageEdit = 'Dung lượng ảnh vượt quá 1Mb';
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
      this.messageEdit = "Vui lòng không chọn quá 5 ảnh.";
      this.selectedFile = [];
    }
  }

  updateProduct(id) {
    if (this.formEditProduct.valid && this.userFind != null) {
      if (this.readFile.length != 0) {
        for (let i = 0; i < this.readFile.length; i++) {
          let selectedImage = this.readFile[i];
          const n = Date.now();
          const filePath = `RoomsImages/${n}`;
          const fileRef = this._storage.ref(filePath);
          this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                this.messageEdit = ""
                this.imgCreate.push(url);
              });
            })
          ).subscribe(() => {
          });
        }
      }
      setTimeout(() => {
        this.formEditProduct.patchValue({user: this.userFind.id})
        this.productDto = this.formEditProduct.value;
        this._productService.update(this.productDto, id).subscribe(data => {
          if (this.imgCreate.length !== 0) {
            for (let i = 0; i < this.imgCreate.length; i++) {
              const image: ImgUrlProductDto = {
                url: this.imgCreate[i],
                product: data.id
              };
              this._imageProductService.create(image).subscribe(() => {
              });
            }
          }
          if (this.idImageList.length !== 0) {
            for (let j = 0; j < this.idImageList.length; j++) {
              this.deleteImageById(this.idImageList[j])
            }
          }
          this._toast.success("Cập nhật sản phẩm thành công!");
          this._router.navigateByUrl("/products")
        });
      }, 2000)
    } else {
      this._toast.error("Cập nhật sản phẩm thất bại!");
    }
  }

  deleteImage(i, img) {
    this.idImageList.push(img.id);
    this.imgs.splice(i, 1);
    this._toast.error("Bạn đã xóa 1 ảnh!");
  }

  deleteImageNew(index) {
    this.selectedFile.splice(index, 1)
    this._toast.error("Bạn đã xóa 1 ảnh!");
  }

  deleteImageById(id: number) {
    this._imageProductService.delete(id).subscribe(data => {
    });
  }

  resetFindUserById(testNum) {
    testNum.removeAttribute('disabled');
  }

  resetForm(file) {
    this.ngOnInit();
    this.selectedFile = [];
    file.value = "";
    this.messageEdit = '';
  }

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
}
