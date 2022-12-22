
import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../../service/payment/payment.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TokenService} from "../../../service/security/token.service";
import {User} from "../../../model/user/user";
import {PaymentDto} from "../../../dto/payment-dto";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.css']
})
export class PaymentCartComponent implements OnInit {

  paymentList: PaymentDto[] = [];
  userId: number;
  form: FormGroup;
  paymentListId: number [];
  checkedAll: boolean;
  sum = 0;
  total = 0;
  shipping = 49000;
  date = new Date();
  shippingDate = this.date.setDate(this.date.getDate() + 5);
  currentUser: User;

  constructor(private _paymentService: PaymentService,
              private _formBuilder: FormBuilder,
              private _tokenService: TokenService,
              private _titleService: Title,) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Giỏ Hàng');
    if (this._tokenService.isLogged()) {
      this.currentUser = JSON.parse(this._tokenService.getUser());
      this.userId = this.currentUser.id;
    }

    this.paymentListId = [];
    this._paymentService.getPaymentList(String(this.userId)).subscribe(data => {
      console.log('okoko')
      console.log(data)
      this.paymentList = data;
    }, err => {
      console.log('loi roi')
      console.log(err);
    }, () => {
      console.log('done');
    });
    console.log(this.paymentList);
    console.log(this.paymentListId);
  }


  addAllToCart() {
    this.checkedAll = true;
    for (const value of this.paymentList) {
      if (!this.paymentListId.includes(value.id)) {
        this.checkedAll = false;
        break;
      }
    }
    if (this.checkedAll) {
      for (const value of this.paymentList) {
        const index = this.paymentListId.indexOf(value.id, 0);
        this.paymentListId.splice(index, 1);
      }
    } else {
      for (const value of this.paymentList) {
        const index = this.paymentListId.indexOf(value.id, 0);
        // tslint:disable-next-line:triple-equals
        if (index == -1) {
          this.paymentListId.push(value.id);
          console.log(value.id);
        }
      }
    }
    this.calculateMoney(this.paymentListId);
  }

  addToCart(id: number) {
    const index = this.paymentListId.indexOf(id, 0);
    index > -1 ? this.paymentListId.splice(index, 1) : this.paymentListId.push(id);
    this.calculateMoney(this.paymentListId);
  }

  transferId() {
    this._paymentService.idArray = this.paymentListId;
  }

  calculateMoney(paymentListId: number[]) {
    let tempt = 0;
    for (const item of this.paymentList) {
      if (paymentListId.includes(item.id, 0)) {
        tempt += item.productPrice;
      }
      console.log(this.paymentList);
      console.log(this.paymentListId);
    }
    this.sum = tempt;
    // tslint:disable-next-line:triple-equals
    if (this.sum == 0) {
      this.total = 0;
    } else {
      this.total = this.sum + 49000;
    }
  }
}
