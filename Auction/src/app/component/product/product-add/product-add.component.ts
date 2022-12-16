import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../../../service/product/product.service';
import {Product} from '../../../model/product/product';
import {Category} from '../../../model/product/category';
import {PriceStep} from '../../../model/product/price-step';
import {CategoryService} from '../../../service/product/category.service';
import {PriceStepService} from '../../../service/product/price-step.service';
import {User} from '../../../model/user/user';
import {UserService} from '../../../service/user/user.service';

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
  userFind: User;
  userId: number;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private categoryService: CategoryService,
              private priceStepService: PriceStepService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe(data => {
      this.categoryList = data;
    });
    this.priceStepService.getListPriceStep().subscribe(data => {
      this.priceStepList = data;
    });
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
    });
  }

  addNewProduct() {

  }

  findUserById(value) {
    this.userService.findUserById(value).subscribe(data => {
      this.userFind = data;
      console.log(this.userFind);
    });
  }
}
