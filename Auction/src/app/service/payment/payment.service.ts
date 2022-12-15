import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Payment} from '../../model/payment/payment';
import {PaymentDto} from "../../dto/payment-dto";

const URL_API = `${environment.api_url_order_status}`;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  getListPayment(): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(URL_API + '/find-by-list-id');
  }

  getTotalBill(): Observable<PaymentDto>{
    return this.http.get<PaymentDto>(URL_API + '/get-total-bill');
  }
}
