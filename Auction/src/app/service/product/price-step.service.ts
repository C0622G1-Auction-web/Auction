import {Injectable} from '@angular/core';
import {Category} from "../../model/product/category";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PriceStep} from "../../model/product/price-step";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PriceStepService {

  constructor(private _httpClient: HttpClient) { }


  getListPriceStep(): Observable<PriceStep[]> {
    return this._httpClient.get<PriceStep[]>(environment.priceStepUrl)
  }
}
