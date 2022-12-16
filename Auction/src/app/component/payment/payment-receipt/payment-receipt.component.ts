import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaymentDto} from '../../model/payment/payment-dto';
import {PaymentService} from '../../service/payment/payment.service';
// @ts-ignore
import {jsPDF} from 'jspdf';
// @ts-ignore
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})
export class PaymentReceiptComponent implements OnInit {

  paymentList: PaymentDto[];

  @ViewChild('content', {static: true}) ab: ElementRef<HTMLImageElement>;

  // tslint:disable-next-line:variable-name
  constructor(private _paymentService: PaymentService) {
  }

  ngOnInit(): void {
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
