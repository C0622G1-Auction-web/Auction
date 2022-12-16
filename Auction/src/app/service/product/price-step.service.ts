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

<<<<<<< HEAD
  constructor(private httpClient: HttpClient) {
  }
=======
  constructor(private _httpClient: HttpClient) { }
>>>>>>> 15fbba97fa97a0a6e00e561a2462e4cda7f49af3

  getListPriceStep(): Observable<PriceStep[]> {
    return this._httpClient.get<PriceStep[]>(environment.priceStepUrl)
  }
}
