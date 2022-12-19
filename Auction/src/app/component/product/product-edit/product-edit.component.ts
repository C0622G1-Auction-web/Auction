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
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ImgUrlProduct} from "../../../model/product/img-url-product";
import {finalize} from "rxjs/operators";
import {ImgUrlProductDto} from "../../../model/product/dto/img-url-product-dto";
import {ProductDto} from "../../../model/product/dto/product-dto";
import {ProductAddComponent} from '../product-add/product-add.component';
import {checkStartTime} from "../product-add/product-add.component";
import {ToastrService} from "ngx-toastr";
import {checkEndTime} from "../product-add/product-add.component";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productDto: ProductDto;
  categoryList: Category[] = [];
  priceStepList: PriceStep[] = [];
  selectedFile: any[] = [];
  formEditProduct: FormGroup;
  productFind: Product;
  id: number;
  userFind: any;
  imgs: ImgUrlProduct[] = [];
  idImageList: any[] = [];
  imgCreate: any[] = [];
  checkUser = "";
  messageEdit = "";

  constructor(private _formBuilder: FormBuilder,
              private _productService: ProductService,
              private _categoryService: CategoryService,
              private _priceStepService: PriceStepService,
              private _userService: UserService,
              private _storage: AngularFireStorage,
              private _imageProductService: ImageProductService,
              private _activatedRoute: ActivatedRoute,
              private _toast: ToastrService) {

  }

  ngOnInit(): void {
    this.getListCategory();
    this.getListPriceStep();
    this.getFormEdit();
  }

  getFormEdit() {
    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get("id");
      this._productService.findByIdd(this.id).subscribe(data => {
        this.productFind = data;
        this._userService.findUserById(data.user.id).subscribe(data => {
          this.userFind = data;
          this.formEditProduct.patchValue({user: this.userFind.id})
          this.checkUser = "Mã người đăng: " + this.userFind.id + "\n" + "Tên người đăng: " + this.userFind.firstName + " " + this.userFind.lastName;
        });
        console.log(this.productFind);
        this._imageProductService.getListImgProductId(this.productFind.id).subscribe(value => {
          this.imgs = value;
          console.log(value);
        });
        this.formEditProduct = this._formBuilder.group({
          id: [product.id, [Validators.required]],
          name: [product.name, [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
          description: [product.description, [Validators.required]],
          initialPrice: [product.initialPrice, [Validators.required, Validators.pattern('\\d+$')]],
          startTime: [product.startTime, [Validators.required]],
          endTime: [product.endTime, [Validators.required]],
          registerDay: [product.registerDay],
          priceStep: [product.priceStep.id],
          category: [product.category.id],
          reviewStatus: [product.reviewStatus.id],
          auctionStatus: [product.auctionStatus.id],
          user: ["", [Validators.required, Validators.pattern('\\d+$')]],
          imageProduct: ["", [Validators.required]],
        }, {validators: [checkStartTime, checkEndTime]});
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

  findUserById(testNum) {
    testNum.setAttribute('disabled', true);
    this._userService.findUserById(testNum.value).subscribe(data => {
      this.userFind = data;
      this.formEditProduct.patchValue({user: this.userFind.id});
      this.checkUser = "Mã người đăng: " + this.userFind.id + "\n" + "Tên người đăng: " + this.userFind.firstName + " " + this.userFind.lastName;
      console.log(this.userFind)
    }, error => {
      this.checkUser = "Không tìm thấy thông tin người đăng!"
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files;
    } else {
      this.selectedFile = [];
    }
    console.log(this.selectedFile);
    if (this.selectedFile.length !== 0) {
      setTimeout(() => {
        this.messageEdit = "Đang tải ảnh vui lòng đợi........";
      }, 3000)
      for (let i = 0; i < this.selectedFile.length; i++) {
        let selectedImage = this.selectedFile[i];
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
      console.log(this.imgCreate)
    }
  }

  updateProduct(id) {
    if (this.formEditProduct.valid) {
      this.productDto = this.formEditProduct.value;
      console.log(this.formEditProduct.value)
      this._productService.update(this.productDto, id).subscribe(data => {
        if (this.imgCreate.length !== 0) {
          for (let i = 0; i < this.imgCreate.length; i++) {
            const image: ImgUrlProductDto = {
              url: this.imgCreate[i],
              product: data.id
            };
            console.log(image);
            this._imageProductService.create(image).subscribe(() => {
            });
          }
        }
      },error => {
        this._toast.error("Cập nhật sản phẩm thất bại!");
      });
      this._toast.success("Cập nhật sản phẩm thành công!");
      if (this.idImageList.length !== 0) {
        for (let j = 0; j < this.idImageList.length; j++) {
          console.log(this.idImageList[j])
          this.deleteImageById(this.idImageList[j])
        }
      }
    }
    this._toast.error("Cập nhật sản phẩm thất bại!");
  }

  deleteImage(i, img) {
    this.idImageList.push(img.id);
    this.imgs.splice(i, 1);
    this._toast.error("Bạn đã xóa 1 ảnh!")
  }

  deleteImageNew(index) {
    this.imgCreate.splice(index, 1)
    this._toast.error("Bạn đã xóa 1 ảnh!")
  }

  deleteImageById(id: number) {
    this._imageProductService.delete(id).subscribe(data => {
    });
  }

  resetFindUserById(testNum) {
    testNum.removeAttribute('disabled')
  }

  resetForm() {
    this.ngOnInit();
  }

}
