import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Category } from 'src/app/model/product/category';
import { ImgUrlProductDto } from 'src/app/model/product/dto/img-url-product-dto';
import { ProductDto } from 'src/app/model/product/dto/product-dto';
import { PriceStep } from 'src/app/model/product/price-step';
import { Product } from 'src/app/model/product/product';
import { User } from 'src/app/model/user/user';
import { CategoryService } from 'src/app/service/product/category.service';
import { ImageProductService } from 'src/app/service/product/image-product.service';
import { PriceStepService } from 'src/app/service/product/price-step.service';
import { ProductService } from 'src/app/service/product/product.service';
import { UserService } from 'src/app/service/user/user.service';

export const checkStartDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startDay = new Date(control.get('startDay').value).getTime();
  const dateNow = new Date().getTime();
  console.log(dateNow);
  if (startDay - dateNow < 24 * 60 * 60 * 1000) {
    return {checkStartDay: true};
  } else {
    return null;
  }
};

export const checkEndDay: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startDay = new Date(control.get('startDay').value).getTime();
  const endDay = new Date(control.get('endDay').value).getTime();
  if (endDay - startDay < 24 * 60 * 60 * 1000) {
    return {checkStartDay: true};
  } else {
    return null;
  }
};

@Component({
  selector: 'app-auction-product-add',
  templateUrl: './auction-product-add.component.html',
  styleUrls: ['./auction-product-add.component.css']
})
export class AuctionProductAddComponent implements OnInit {

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
  

  constructor(private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _priceStepService: PriceStepService,
    private _userService: UserService,
    private _storage : AngularFireStorage,
    private _imageProductService: ImageProductService) { }

    ngOnInit(): void {
      this._categoryService.getListCategory().subscribe(data => {
        this.categoryList = data;
      })
      this._priceStepService.getListPriceStep().subscribe(data => {
        this.priceStepList = data;
      })
      this.formCreateProduct = this._formBuilder.group({
        id: ['', [Validators.required]],
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        initialPrice: ['', [Validators.required]],
        startTime: ['', [Validators.required]],
        endTime: ['', [Validators.required]],
        registerDay: ['', [Validators.required]],
        priceStep: ['', [Validators.required]],
        category: ['', [Validators.required]],
        user: ['', [Validators.required]]
      })
    };
  
    addNewProduct() {
      this.productDto = this.formCreateProduct.value;
      console.log(this.formCreateProduct.value)
      this._productService.save(this.productDto).subscribe(data => {
        console.log(data);
        if (this.selectedImages.length !== 0) {
          for (let i = 0; i < this.selectedImages.length; i++) {
            let selectedImage = this.selectedImages[i];
            const n = Date.now();
            const filePath = `RoomsImages/${n}`;
            const fileRef = this._storage.ref(filePath);
            this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe(url => {
                  const image: ImgUrlProductDto = {
                    url: url,
                    product: data.id
                  };
                  console.log(url);
                  console.log(image)
                  this._imageProductService.create(image).subscribe(() => {
                    console.log('SUCCESSFULLY CREATE')
                  });
                });
              })
            ).subscribe();
          }
        }
      }, 
      error => {
        this.error = error.message;
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
      let newSelectedImages = [];
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        newSelectedImages = event.target.files;
        for (let i = 0; i < event.target.files.length; i++) {
          this.selectedImages.push(event.target.files[i]);
        }
      } else {
        this.selectedImages = [];
      }
      console.log(this.selectedImages)
      if (newSelectedImages.length !== 0) {
        for (let i = 0; i < newSelectedImages.length; i++) {
          let selectedImage = newSelectedImages[i];
          const n = Date.now();
          const filePath = `RoomsImages/${n}`;
          const fileRef = this._storage.ref(filePath);
          this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                this.img.push(url);
                if (this.img.length == newSelectedImages.length) {
                }
              });
            })
          ).subscribe();
        }
      }
    }
}



