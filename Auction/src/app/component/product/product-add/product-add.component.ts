import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../../service/product/product.service";
import {Product} from "../../../model/product/product";
import {Category} from "../../../model/product/category";
import {PriceStep} from "../../../model/product/price-step";
import {CategoryService} from "../../../service/product/category.service";
import {PriceStepService} from "../../../service/product/price-step.service";
import {ReviewStatus} from "../../../model/product/review-status";
import {AuctionStatus} from "../../../model/product/auction-status";
import {User} from "../../../model/user/user";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product: Product;
  categoryList: Category[] = [];
  priceStepList: PriceStep[] = [];
  formCreateProduct: FormGroup;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private categoryService: CategoryService,
              private priceStepService: PriceStepService) {
  }

  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe(data=>{
       this.categoryList = data;
    })
    this.priceStepService.getListPriceStep().subscribe(data=>{
      this.priceStepList = data;
    })
    this.formCreateProduct = this.formBuilder.group({
      id: [],
      name: [],
      description: [],
      initialPrice: [],
      startTime: [],
      endTime: [],
      registerDay: [],
      priceStep: [],
      reviewStatus: [],
      auctionStatus: [],
      category: [],
      user: []
    })
  }

  addNewProduct() {

  }
}
