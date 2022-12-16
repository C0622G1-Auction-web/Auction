import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PaymentDto} from '../../dto/payment-dto';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

const URL_API = `${environment.api_url_order_status}`;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentDtoList: PaymentDto[];

  total: number;

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {
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


  /**
   * Create by: BaoBC
   * Date created: 16/12/2022
   */
  getPaymentList(paymentDtoList: PaymentDto[]) {
    this.paymentDtoList = paymentDtoList;
  }

  /**
   * Create by: BaoBC
   * Date created: 16/12/2022
   */
  getToTal(total: number) {
    this.total = total;
  }

  /**
   * Create by: BaoBC
   * Date created: 16/12/2022
   */
  getListPaymentDto(): PaymentDto[] {
    return this.paymentDtoList;
  }

  /**
   * Create by: BaoBC
   * Date created: 16/12/2022
   */
  getTotalBillDto(): number {
    return this.total;
  }


}
