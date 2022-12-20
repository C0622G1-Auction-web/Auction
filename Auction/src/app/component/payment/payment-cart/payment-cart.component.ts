import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../../service/payment/payment.service";
import {PaymentDto} from "../../../dto/payment-dto";
import {FormGroup, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.css']
})
export class PaymentCartComponent implements OnInit {

  paymentList: PaymentDto[];
  userId = "3";
  form: FormGroup;
  paymentListId: number [];
  checkedAll: boolean;
  sum: number = 0;
  total: number = 0;
  shipping: number = 49000;
  date = new Date();
  shippingDate = this.date.setDate(this.date.getDate() + 5);

  constructor(private _paymentService: PaymentService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.paymentListId = [];
    this._paymentService.getPaymentList(this.userId).subscribe(data => {
      this.paymentList = data;
    }, err => {
      console.log(err);
    }, () => {
      console.log("done");
    });

  }


  addAllToCart() {
    this.checkedAll = true;
    for (let value of this.paymentList) {
      if (!this.paymentListId.includes(value.code)) {
        this.checkedAll = false;
        break;
      }
    }
    if (this.checkedAll) {
      for (let value of this.paymentList) {
        const index = this.paymentListId.indexOf(value.code, 0);
        this.paymentListId.splice(index, 1);
      }
    } else {
      for (let value of this.paymentList) {
        const index = this.paymentListId.indexOf(value.code, 0);
        if (index == -1) {
          this.paymentListId.push(value.code);
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
      if (paymentListId.includes(item.code, 0)) {
        tempt += item.productPrice;
      }
    }
    this.sum = tempt;
    if (this.sum == 0) {
      this.total = 0;
    } else {
      this.total = this.sum + 49000;
    }
  }
}
