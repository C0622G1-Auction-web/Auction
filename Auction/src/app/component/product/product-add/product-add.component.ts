import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {PriceStep} from '../../../model/product/price-step';
import {Category} from '../../../model/product/category';
import {User} from '../../../model/user/user';
import {ProductService} from '../../../service/product/product.service';
import {ToastrService} from 'ngx-toastr';
import {Product} from "../../../model/product/product";
import {CategoryService} from "../../../service/product/category.service";
import {PriceStepService} from "../../../service/product/price-step.service";
import {UserService} from "../../../service/user/user.service";
import {finalize} from "rxjs/operators";
import {ImgUrlProduct} from "../../../model/product/img-url-product";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImageProductService} from "../../../service/product/image-product.service";
import {ProductDto} from "../../../model/product/dto/product-dto";
import {ImgUrlProductDto} from "../../../model/product/dto/img-url-product-dto";




import {finalize} from "rxjs/operators";
import {ImageProductService} from "../../../service/product/image-product.service";
import {ImgUrlProduct} from "../../../model/product/img-url-product";
import {AngularFireStorage} from "@angular/fire/storage";
import {ProductDto} from "../../../model/product/product-dto";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
<<<<<<< HEAD
  product: Product;
  productDto: ProductDto;
=======

  product: ProductDto;
>>>>>>> 15fbba97fa97a0a6e00e561a2462e4cda7f49af3
  categoryList: Category[] = [];
  priceStepList: PriceStep[] = [];
  formCreateProduct: FormGroup;
  userFind: User;
  userId: number;
  selectedImages: any[] = [];
  img: any[] =[];
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
      name: [],
      description: [],
      initialPrice: [],
      startTime: [],
      endTime: [],
      registerDay: [],
      priceStep: [],
      category: [],
      user: []
    })
  }

  addNewProduct() {
<<<<<<< HEAD
    this.productDto = this.formCreateProduct.value;
    console.log(this.formCreateProduct.value)
    this._productService.save(this.productDto).subscribe(data => {
=======
   this.product = this.formCreateProduct.value;
    console.log(this.formCreateProduct.value)
    return this._productService.saveProduct(this.product).subscribe(data => {
      console.log(data)
>>>>>>> 15fbba97fa97a0a6e00e561a2462e4cda7f49af3
      if (this.selectedImages.length !== 0) {
        for (let i = 0; i < this.selectedImages.length; i++) {
          let selectedImage = this.selectedImages[i];
          const n = Date.now();
          const filePath = `RoomsImages/${n}`;
          const fileRef = this._storage.ref(filePath);
          this._storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
<<<<<<< HEAD
                const image: ImgUrlProductDto = {
                  url: url,
                  product: data.id
=======
                const image: ImgUrlProduct = {
                  url: url,
                  product: data
>>>>>>> 15fbba97fa97a0a6e00e561a2462e4cda7f49af3
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
<<<<<<< HEAD
    console.log(this.selectedImages)
    if (newSelectedImages.length !== 0) {
      for (let i = 0; i < newSelectedImages.length; i++) {
        let selectedImage = newSelectedImages[i];
        const n = Date.now();
=======
    if (newSelectedImages.length !== 0) {
      for (let i = 0; i < newSelectedImages.length; i++) {
        let selectedImage = newSelectedImages[i];
        var n = Date.now();
>>>>>>> 15fbba97fa97a0a6e00e561a2462e4cda7f49af3
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
        ).subscribe(() => {
        });
      }
    }
  }
}
