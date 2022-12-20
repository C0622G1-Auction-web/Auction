import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../model/product/product";
import {environment} from "../../../environments/environment";
import {IauctionProductDto} from "../../model/auction/iauction-product-dto";
import {DataResult} from "../../model/product/data_result";
import {IProductDto} from "../../model/product/iproduct-dto";
import {PageProductHistory} from "../../model/product/dto/page-product-history";
import {PageAuctionProductHistory} from "../../model/auction/page-auction-product-history";

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private _httpClient: HttpClient) {
  }

  getAuctionByProductId(idProduct: number): Observable<Product> {
    return this._httpClient.get<Product>(environment.API_URL_AUCTION + '/auction/' + idProduct);
  }

  //
  // findAllProductByUserId(curPage: number, numberRecord: number): Observable<DataResult<IauctionProductDto>> {
  //   return this._httpClient.get<DataResult<IProductDto>>('http://localhost:8080/api/v1/auction/list/{userId}' );
  // }


  findAll(id: number, curPage: number): Observable<PageAuctionProductHistory> {
    return this._httpClient.get<PageAuctionProductHistory>('http://localhost:8080/api/v1/auction/list/' + id + '?page=' + curPage);
  }

}

