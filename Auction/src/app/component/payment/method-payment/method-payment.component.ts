import {Component, OnInit} from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';
import {PaymentService} from '../../../service/payment/payment.service';
import {PaymentDto} from '../../../dto/payment-dto';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-method-payment',
  templateUrl: './method-payment.component.html',
  styleUrls: ['./method-payment.component.css']
})
export class MethodPaymentComponent implements OnInit {

  paymentDtoList: Observable<PaymentDto[]>;
  total: Observable<PaymentDto[]>;

  paypal: string;
  // tslint:disable-next-line:variable-name
  constructor(private _paymentService: PaymentService) {
    this.paymentDtoList =  this._paymentService.findPaymentList();
    this.total = this._paymentService.findPaymentList();
    this.paypal = (this.total +'23.570') + '';
    render(
      {
        id: '#myPaypal',
        value: '10',
        currency: 'USD',
        onApprove: (details) => {
          alert('Thanh toán thành công');
        }
      }
    );
  }

  ngOnInit(): void {
  }

}
