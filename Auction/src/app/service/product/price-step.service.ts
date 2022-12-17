import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceStep } from 'src/app/model/product/price-step';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceStepService {

  constructor(private _httpClient: HttpClient) {}

  getListPriceStep(): Observable<PriceStep[]> {

    return this._httpClient.get<PriceStep[]>(environment.api_url_list_price_step);

  }
}
