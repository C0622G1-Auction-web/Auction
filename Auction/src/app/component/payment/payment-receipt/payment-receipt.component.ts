import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

// @ts-ignore
import {PaymentDto} from '../../model/payment/payment-dto';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import {PaymentService} from '../../../service/payment/payment.service';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})
export class PaymentReceiptComponent implements OnInit {

  paymentList: PaymentDto[];
  paymentBill: number | undefined;
  @ViewChild('content', {static: true}) ab: ElementRef<HTMLImageElement>;

  // tslint:disable-next-line:variable-name
  constructor(private _paymentService: PaymentService) {
    this.findPaymentList();
  }

  ngOnInit(): void {
  }

  findPaymentList() {
    this._paymentService.findPaymentList().subscribe(data => {
      console.log(data);
      this.paymentList = data;
      this.paymentBill = 49000;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++) {
        this.paymentBill += +data[i].productPrice;
      }
    }, error => {
      this._paymentService.showErrorMessage('Không thể lấy danh sách');
    });
  }

  convertToPDF() {
    html2canvas(this.ab.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF({
        orientation: 'portrait'
      });
      const imageProps = pdf.getImageProperties(imgData);
      const width = pdf.internal.pageSize.getWidth();
      const height = (imageProps.height * width) / imageProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('output.pdf');
    });
  }

}
