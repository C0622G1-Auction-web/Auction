import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import {PaymentDto} from '../../model/payment/payment-dto';
// import {jsPDF} from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.css']
})
export class PaymentReceiptComponent implements OnInit {

  paymentList: PaymentDto[];

  @ViewChild('content', {static: true}) ab: ElementRef<HTMLImageElement>;

  constructor() {
  }

  ngOnInit(): void {
  }

  convertToPDF() {
    // html2canvas(this.ab.nativeElement).then(canvas => {
    //   const imgData = canvas.toDataURL('image/jpeg');
    //   const pdf = new jsPDF({
    //     orientation: 'portrait'
    //   });
    //   const imageProps = pdf.getImageProperties(imgData);
    //   const width = pdf.internal.pageSize.getWidth();
    //   const height = (imageProps.height * width) / imageProps.width;
    //   pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    //   pdf.save('output.pdf');
    // });
  }

}
