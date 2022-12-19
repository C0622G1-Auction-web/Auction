import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Payment} from '../../model/payment/payment';
import {PaymentDto} from '../../model/payment/payment-dto';

const API_URL_RECEIPT = `${environment.api_url_order_status}`;
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private API_URL = 'http://localhost:8080/api/v1/payments/';


  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient,
              // tslint:disable-next-line:variable-name
              private _toastrService: ToastrService) {
  }

  sendId(idList: string[]): Observable<Payment[]> {
    const params = new HttpParams({
      fromObject: {id: idList }
    });
    console.log(this.API_URL + params);
    return this._httpClient.get<Payment[]>(this.API_URL, {params});
  }



  findPaymentList(): Observable<PaymentDto[]> {
    return this._httpClient.get<PaymentDto[]>(API_URL_RECEIPT);
  }

  showSuccessMessage(message: string) {
    this._toastrService.success(message, 'Alert', {
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }

  showErrorMessage(message: string) {
    this._toastrService.error(message, 'Error', {
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }
}

