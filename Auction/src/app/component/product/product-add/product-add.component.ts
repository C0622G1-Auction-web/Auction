import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../service/product/product.service';
import {Product} from '../../../model/product/product';
import {Category} from '../../../model/product/category';
import {PriceStep} from '../../../model/product/price-step';
import {CategoryService} from '../../../service/product/category.service';
import {PriceStepService} from '../../../service/product/price-step.service';
import {User} from '../../../model/user/user';
import {UserService} from '../../../service/user/user.service';

import {finalize} from "rxjs/operators";
import {ImgUrlProduct} from "../../../model/product/img-url-product";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImageProductService} from "../../../service/product/image-product.service";
import {ImgUrlProductDto} from "../../../model/product/dto/img-url-product-dto";
import {ProductDto} from "../../../model/product/dto/product-dto";


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product: Product;
  productDto: ProductDto;
  categoryList: Category[] = [];
  priceStepList: PriceStep[] = [];
  formCreateProduct: FormGroup;
  userFind: User;
  userId: number;
  selectedFile: any[] = [];
  imgs: any[] = [];
  message = "";

  constructor(private _formBuilder: FormBuilder,
              private _productService: ProductService,
              private _categoryService: CategoryService,
              private _priceStepService: PriceStepService,
              private _userService: UserService,
              private _storage: AngularFireStorage,
              private _imageProductService: ImageProductService) {
  }

  ngOnInit(): void {
    this._categoryService.getListCategory().subscribe(data => {
      this.categoryList = data;
    })
    this._priceStepService.getListPriceStep().subscribe(data => {
      this.priceStepList = data;
    })
    this.formCreateProduct = this._formBuilder.group({
      id: [],
      name: ["",[Validators.required]],
      description: ["",[Validators.required]],
      initialPrice: ["",[Validators.required]],
      startTime: ["",[Validators.required]],
      endTime: ["",[Validators.required]],
      registerDay: [],
      priceStep: ["",[Validators.required]],
      category: ["",[Validators.required]],
      user: ["",[Validators.required]]
    });
  }

  addNewProduct() {
    this.productDto = this.formCreateProduct.value;
    console.log(this.formCreateProduct.value)
    this._productService.save(this.productDto).subscribe(data => {
      if (this.imgs.length !== 0) {
        for (let i = 0; i < this.imgs.length; i++) {
          const image: ImgUrlProductDto = {
            url: this.imgs[i],
            product: data.id
          };
          console.log(image);
          this._imageProductService.create(image).subscribe(() => {
            console.log('SUCCESSFULLY CREATE');
          })
        }
      }
    });
  }

  findUserById(testNum) {
    testNum.setAttribute('disabled',true);
    this._userService.findUserById(testNum.value).subscribe(data => {
      this.userFind = data;
      this.formCreateProduct.patchValue({user: this.userFind.id})
      console.log(this.userFind);
    })
  }

  showPreview(event: any) {
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
              this.imgs.push(url);
            });
          })
        ).subscribe(() => {
        });
      }
    }
  }

  deleteImageNew(index) {
    this.imgs.splice(index, 1)
    console.log(index)
  }

  resetFindUserById(testNum) {
    testNum.removeAttribute('disabled')
  }
}
