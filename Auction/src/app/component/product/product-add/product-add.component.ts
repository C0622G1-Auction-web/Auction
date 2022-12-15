import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {PriceStep} from '../../../model/product/price-step';
import {Category} from '../../../model/product/category';
import {User} from '../../../model/user/user';
import {ProductService} from '../../../service/product/product.service';
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
  private error: any;

  constructor(private productService: ProductService,
              private toastService: ToastrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.productService.findAllPriceStep().subscribe(data => {
      this.priceStepList = data;
    });

    this.productService.findAllCategory().subscribe(data => {
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
  }

  createProduct() {
    this.productService.save(this.newProduct.value).subscribe(data => {
        this.toastService.success('them moi thanh cong', 'them moi');
      },
      error => {
        this.error = error.message;
      });
  }

}
