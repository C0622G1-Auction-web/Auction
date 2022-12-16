import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../model/product/product";
import {environment} from "../../../environments/environment";
import {Auction} from "../../model/auction/auction";

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private _httpClient: HttpClient) {
  }

  getAuctionByProductId(productId: number): Observable<Product> {
    return this._httpClient.get<Product>(environment.API_URL_AUCTION + '/auction-detail/' + productId);
  }

  getAuctionPageByProductId(idProduct: number, pageNumber: number): Observable<any> {
    return this._httpClient.get(environment.API_URL_AUCTION + '/product/'
      + idProduct+'?page='+pageNumber);
  }
}

