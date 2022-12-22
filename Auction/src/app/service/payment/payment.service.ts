import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Payment} from '../../model/payment/payment';
import {PaymentDto} from '../../dto/payment-dto';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

const URL_API = `${environment.api_url_order_status}`;
const API_URL_RECEIPT = `${environment.api_url_order_status}`;
const API_URL_RECEIPT_1 = `${environment.api_url_order_status_1}`;
const API_URL_SHIPPING = `${environment.api_url_shipping}`;
import {Injectable} from '@angular/core';
import {PaymentAddressDto} from "../../dto/payment-address-dto";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  idArray: number[];

  constructor(private _httpClient: HttpClient,
              private _toastrService: ToastrService,
              private _router: Router,
              private _activateRoute: ActivatedRoute) {
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

  getIdList() {
    return this.idArray;
  }

  /**
   * Create by: ChauPTM
   * Date created: 16/12/2022
   * Function: to find payment by List id
   * @return product list dto
   */
  findPaymentList(idList: number[]): Observable<PaymentAddressDto[]> {
    return this._httpClient.post<PaymentAddressDto[]>(API_URL_RECEIPT_1, idList);
  }

  updateShipDescription(payments: any[]): Observable<any> {
    return this._httpClient.post<any>(API_URL_SHIPPING, payments);
  }

}
