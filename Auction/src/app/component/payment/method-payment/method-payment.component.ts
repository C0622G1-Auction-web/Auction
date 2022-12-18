import {Component, Input, OnInit} from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';
import {PaymentService} from '../../../service/payment/payment.service';
import {PaymentDto} from '../../../dto/payment-dto';

@Component({
  selector: 'app-method-payment',
  templateUrl: './method-payment.component.html',
  styleUrls: ['./method-payment.component.css']
})
export class MethodPaymentComponent implements OnInit {
  paymentDtoList: PaymentDto[];
  total: number;


  // tslint:disable-next-line:variable-name
  constructor(private _paymentService: PaymentService) {

  }

  ngOnInit(): void {
    this.getListPayment();
    this._paymentService.getTotalBill().subscribe(value => {
      this.total = value.totalBill;
      console.log(this.total);
      render(
        {
          id: '#myPaypal',
          value:   String((this.total / 23000).toFixed(2)),
          currency: 'USD',
          onApprove: (details) => {
            alert('Thanh toán thành công');
          }
        }
      );
    });
  }


  getListPayment() {
    this._paymentService.getListPayment().subscribe(value => {
      if (value != null) {
        this.paymentDtoList = value;
        console.log(value);
      }
    });
  }

  getTotalBill() {
    this._paymentService.getTotalBill().subscribe(value => {
      this.total = value.totalBill;
    });
  }

}
