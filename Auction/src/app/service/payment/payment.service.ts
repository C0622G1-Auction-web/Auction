import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PaymentDto} from '../../dto/payment-dto';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Payment} from '../../model/payment/payment';

const URL_API = `${environment.api_url_order_status}`;
const API_URL_RECEIPT = `${environment.api_url_order_status}`;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentDtoList: PaymentDto[];

  total: number;

  constructor(private _httpClient: HttpClient,
              private _toastrService: ToastrService) {
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

  private API_URL = 'http://localhost:8080/api/v1/payments';

  sendId(idList: string[]): Observable<Payment[]> {
    const params = new HttpParams({
      fromObject: {'id': idList}
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

