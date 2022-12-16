import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {Payment} from "../../model/payment/payment";
import {PaymentDto} from "../../model/payment/payment-dto";

const API_URL_RECEIPT = `${environment.api_url_order_status}`;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _httpClient: HttpClient,
              private _toastrService: ToastrService) {
  }

  findPaymentList(): Observable<PaymentDto[]>{
    return this._httpClient.get<PaymentDto[]>(API_URL_RECEIPT);
  }

  showSuccessMessage (message: string) {
    this._toastrService.success(message, 'Alert', {
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }

  showErrorMessage (message: string) {
    this._toastrService.error(message, 'Error', {
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }

}
