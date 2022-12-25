import {Component, OnInit} from '@angular/core';
import {PaymentDto} from "../../../dto/payment-dto";
import {ShipDescription} from "../../../dto/ship-description";
import {PaymentService} from "../../../service/payment/payment.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {render} from "creditcardpayments/creditCardPayments";
import html2canvas from "html2canvas";
import {jsPDF} from 'jspdf';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})
export class PaymentReceiptComponent implements OnInit {

  idList: number[];
  paymentList: PaymentDto[];
  paymentBill: number | undefined;
  paypal: string;
  description: string;
  payments: ShipDescription[] = [];
  display = '';
  isShown: boolean = true;

// tslint:disable-next-line:variable-name
  constructor(private _paymentService: PaymentService,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private _toast: Title,
              private _activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._toast.setTitle('Hóa đơn');
    this.idList = this._paymentService.getIdList();
    this.findPaymentList();

  }

  findPaymentList() {
    this._paymentService.findPaymentList(this.idList).subscribe(data => {
      this.paymentList = data;
      this.paymentBill = 49000;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++) {
        this.paymentBill += +data[i].productPrice;
      }
      this.paypal = (this.paymentBill / 23725000).toFixed(2);

      console.log(this.paypal);
    }, error => {
      this._paymentService.showErrorMessage('Không thể lấy danh sách');
    });
  }

  renderPayPalBtn() {
    document.getElementById("paypalBtn").innerHTML = '<div id="paypalButtons" style="margin-left: 300px"></div>';
    render(
      {
        id: '#paypalButtons',
        value: this.paypal.valueOf(),
        currency: 'USD',
        onApprove: (details) => {
          this._paymentService.showSuccessMessage("Thanh toán thành công");
          this.display = 'none';
          this.goToPay2();
          this.successPayment();
        }
      }
    );
  }


  convertToPDF() {
    html2canvas(document.getElementById('content')).then(canvas => {
      console.log(canvas);
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      let width = pdf.internal.pageSize.getWidth();
      let height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'JPG', 0, 0, width, height)
      pdf.save('Hóa đơn.pdf');
    });
  }

  goToPay() {
    // @ts-ignore
    document.querySelector('.pills-profile-tab').click();

    for (const item of this.paymentList) {
      let shipDes = {
        "id": item.id,
        "shippingDescription": this.description
      }
      this.payments.push(shipDes);
    }
    this._paymentService.updateShipDescription(this.payments).subscribe(data => {
      this._paymentService.showSuccessMessage('Lưu mô tả vận chuyển thành công');
    }, error => {
      this._paymentService.showErrorMessage('Lưu mô tả vận chuyển thất bại');
    })
    this.renderPayPalBtn();
  }

  successPayment() {
    for (const item of this.paymentList) {
      let shipDes = {
        "id": item.id,
      }
      this.payments.push(shipDes);
    }
    this._paymentService.updatePaymentStatus(this.payments).subscribe(data => {
    }, error => {
      this._paymentService.showErrorMessage('Giao dịch thất bại');
    })
  };

  goToPay2() {
    // @ts-ignore
    document.querySelector('.pills-contact-tab').click();
  }
  changeDisplay(){
    this.isShown = false;
  }
  changeDisplay1(){
    this.isShown = true;
  }

}
