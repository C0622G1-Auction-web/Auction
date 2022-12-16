import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Payment} from "../../model/payment/payment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private API_URL = 'http://localhost:8080/api/v1/payments';


  constructor(private _httpClient: HttpClient) {
  }


  sendId(idList: string[]): Observable<Payment[]> {
    const params = new HttpParams({
      fromObject: { 'id': idList }
    });
    console.log(this.API_URL +params);
    return this._httpClient.get<Payment[]>(this.API_URL, {params});
  }


}

