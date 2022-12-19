import {Component, OnInit} from '@angular/core';
import {PaymentService} from '../../../service/payment/payment.service';
import {PaymentDto} from '../../../dto/payment-dto';

@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.css']
})
export class PaymentCartComponent implements OnInit {

  idList: string[] = ['1', '2', '8'];
  paymentList: PaymentDto[];
  userId = '3';


  // tslint:disable-next-line:variable-name
  constructor(private _paymentService: PaymentService,) {
  }

  ngOnInit(): void {
    this._paymentService.getPaymentList(this.userId).subscribe(data => {
      this.paymentList = data;
    }, err => {
      console.log(err);
    }, () => {
      console.log('done');
    });

  }


  sendId() {
    this._paymentService.sendId(this.idList).subscribe(data => {
      console.log(data);
    }, err => {
      console.log('err');
    }, () => {
      console.log('done');
    });
  }
}
