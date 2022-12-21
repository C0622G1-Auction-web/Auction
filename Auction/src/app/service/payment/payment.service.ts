import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Payment} from '../../model/payment/payment';
import {PaymentDto} from '../../dto/payment-dto';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

const URL_API = `${environment.api_url_order_status}`;
const API_URL_RECEIPT = `${environment.api_url_order_status}`;
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  idArray: number [] = [1, 2, 8];

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient,
              // tslint:disable-next-line:variable-name
              private _toastrService: ToastrService,
              // tslint:disable-next-line:variable-name
              private _router: Router,
              // tslint:disable-next-line:variable-name
              private _activateRoute: ActivatedRoute) {
  }

  /**
   * Create by: ChauPTM
   * Date created: 16/12/2022
   * Function: to find payment by List id
   * @return product list dto
   */
  findPaymentList(): Observable<PaymentDto[]> {
    return this._httpClient.post<PaymentDto[]>(API_URL_RECEIPT, this.idArray);
  }

  /**
   * Create by: ChauPTM
   * Date created: 16/12/2022
   * Function: show message when succeed
   * @return message
   */
  showSuccessMessage(message: string) {
    this._toastrService.success(message, 'Thông báo', {
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }

  /**
   * Create by: ChauPTM
   * Date created: 16/12/2022
   * Function: show message when has error
   * @return message
   */
  showErrorMessage(message: string) {
    this._toastrService.error(message, 'Thông báo', {
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }

  getPaymentList(userId: string): Observable<PaymentDto[]> {
    return this._httpClient.get<PaymentDto[]>(API_URL_RECEIPT + '/' + userId + '/list');
  }

}
