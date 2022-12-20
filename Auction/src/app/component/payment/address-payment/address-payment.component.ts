import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-payment',
  templateUrl: './address-payment.component.html',
  styleUrls: ['./address-payment.component.css']
})
export class AddressPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

  redirectPayment() {
    // this.paymentService.getPaymentList(this.paymentDtoList);
    this.paymentService.getToTal(this.total);
  }
}
