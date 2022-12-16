import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PageProduct} from "../../model/product/page-product";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }
  /**
   * Created: SangDD
   * Function: show page product and search
   * Date: 15/11/2022
   */
  getAllAndSearch(rfSearch: any): Observable<any> {
    return this._httpClient.get<PageProduct>(environment.productSearchUrl, rfSearch);
  }

  demo(rfSearch: any): Observable<any> {
    return  this._httpClient.post<any>(environment.DEMO, rfSearch)
  }
}
