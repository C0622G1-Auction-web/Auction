import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PaymentDto} from '../../dto/payment-dto';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Payment} from '../../model/payment/payment';

const URL_API = `${environment.api_url_order_status}`;


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentDtoList: PaymentDto[];

  total: number;

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient,
  ) {
  }

  /**
   * Create by: BaoBC
   * Date created: 16/12/2022
   * Function: to find payment by List id
   *
   * @param idList
   * @return product list
   */
  getListPayment(): Observable<PaymentDto[]> {
    return this._httpClient.get<PaymentDto[]>(URL_API + '/find-by-list-id');
  }

  /**
   * Create by: BaoBC
   * Date created: 16/12/2022
   * Function: get total bill
   *
   * @param idList
   * @return product list
   */
  getTotalBill(): Observable<PaymentDto> {
    return this._httpClient.get<PaymentDto>(URL_API + '/get-total-bill');
  }

  updateDisCription(): Observable<PaymentDto> {
    // @ts-ignore
    return this._httpClient.put<PaymentDto>(URL_API + '/update');
  }

}

