import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, AbstractControl, Validators} from '@angular/forms';
import {ProductService} from '../../../service/product/product.service';
import {Product} from '../../../model/product/product';
import {Category} from '../../../model/product/category';
import {PriceStep} from '../../../model/product/price-step';
import {CategoryService} from '../../../service/product/category.service';
import {PriceStepService} from '../../../service/product/price-step.service';
import {User} from '../../../model/user/user';
import {UserService} from '../../../service/user/user.service';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

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
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  newProduct: FormGroup;
  priceStepList: PriceStep[];
  categoryList: Category[];
  userList: User[];
  product: Product;
  formCreateProduct: FormGroup;
  userFind: User;

  userId: number;
  private error: any;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private categoryService: CategoryService,
              private toastService: ToastrService,
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
    this.productService.findAllPriceStep().subscribe(data => {
      this.priceStepList = data;
    });
    this.priceStepService.getListPriceStep().subscribe(data => {
      this.priceStepList = data;
    });

    this.productService.findAllCategory().subscribe(data => {
      this.categoryList = data;
    });
    this.categoryService.getListCategory().subscribe(data => {
      this.categoryList = data;
    });

    this.productService.findAllUser().subscribe(data => {
      this.userList = data;
    });
    this.newProduct = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      initialPrice: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      priceStepId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      userId: ['', [Validators.required]]
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

  createProduct() {
    this.productService.save(this.newProduct.value).subscribe(data => {
        this.toastService.success('them moi thanh cong', 'them moi');
      },
      error => {
        this.error = error.message;
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
