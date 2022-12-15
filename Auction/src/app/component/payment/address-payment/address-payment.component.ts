import {Component, OnInit} from '@angular/core';
import {PaymentService} from '../../../service/payment/payment.service';
import {Payment} from "../../../model/payment/payment";
import {PaymentDto} from "../../../dto/payment-dto";

@Component({
  selector: 'app-address-payment',
  templateUrl: './address-payment.component.html',
  styleUrls: ['./address-payment.component.css']
})
export class AddressPaymentComponent implements OnInit {

  paymentDtoList: PaymentDto[];

  total: number;

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.getListPayment();
    this.getTotalBill();
  }

  getListPayment() {
    this.paymentService.getListPayment().subscribe(value => {
      if (value != null) {
        this.paymentDtoList = value;
        console.log(value);
      }
    });
  }

  getTotalBill() {
    this.paymentService.getTotalBill().subscribe(value => {
      this.total = value.totalBill;
    });
  }

}
