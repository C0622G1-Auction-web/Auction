import {Component, OnInit} from '@angular/core';
import {ProductDto} from "../../../model/product/product-dto";
import {Category} from "../../../model/product/category";
import {PriceStep} from "../../../model/product/price-step";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../../service/product/product.service";
import {CategoryService} from "../../../service/product/category.service";
import {PriceStepService} from "../../../service/product/price-step.service";
import {UserService} from "../../../service/user/user.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {ImageProductService} from "../../../service/product/image-product.service";
import {Product} from "../../../model/product/product";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ImgUrlProduct} from "../../../model/product/img-url-product";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productDto: ProductDto;
  categoryList: Category[] = [];
  priceStepList: PriceStep[] = [];
  selectedImages: any[] = [];
  formEditProduct: FormGroup;
  productFind: Product;
  id: number;
  userFind: any;
  imgs: ImgUrlProduct[] =[];
  equalsCategory(o1: Category, o2: Category) {
    return o1.id === o2.id;
  }

  equalsPriceStep(o1: PriceStep, o2: PriceStep) {
    return o1.id === o2.id;
  }


  constructor(private _formBuilder: FormBuilder,
              private _productService: ProductService,
              private _categoryService: CategoryService,
              private _priceStepService: PriceStepService,
              private _userService: UserService,
              private _storage: AngularFireStorage,
              private _imageProductService: ImageProductService,
              private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getListCategory();
    this.getListPriceStep();
    this.getFormEdit();
  }

  getFormEdit() {
    this._activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get("id");
      this._productService.findById(this.id).subscribe(data => {
        this.productFind = data;
        this.findUserById(data.user.id);
        console.log(this.productFind);
        this._imageProductService.getListImgProductId(data.user.id).subscribe(data => {
          this.imgs = data
        })
          this.formEditProduct = this._formBuilder.group({
            id: [data.id],
            name: [data.name],
            description: [data.description],
            initialPrice: [data.initialPrice],
            startTime: [data.startTime],
            endTime: [data.endTime],
            registerDay: [data.registerDay],
            priceStep: [data.priceStep],
            category: [data.category],
            user: []
          })
        })

    })
  }

  getListCategory() {
    this._categoryService.getListCategory().subscribe(data => {
      this.categoryList = data;
    })
  }

  getListPriceStep() {
    this._priceStepService.getListPriceStep().subscribe(data => {
      this.priceStepList = data;
    })
  }

  findUserById(value) {
    this._userService.findUserById(value).subscribe(data => {
      this.userFind = data;
      this.formEditProduct.patchValue({user: this.userFind.id})
      console.log(this.userFind)
    })

  }

  showPreview($event: Event) {

  }

  updateProduct() {

  }
}
