
import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../../../service/payment/payment.service";

@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.css']
})
export class PaymentCartComponent implements OnInit {

  idList: string[] =['1','2','8'] ;

  constructor(private _paymentService: PaymentService) {
  }

  ngOnInit(): void {
  }
  sendId() {
    this._paymentService.sendId(this.idList).subscribe(data=>{
      console.log(data);
    }, err => {
      console.log('err');
    }, () => {
      console.log('done');
    })
  }
}
