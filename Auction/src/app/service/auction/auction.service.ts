import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/product/product';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private _httpClient: HttpClient) {
  }

  getAuctionByProductId(idProduct: number): Observable<Product> {
    return this._httpClient.get<Product>(environment.API_URL_AUCTION + '/auction/' + idProduct);
  }
}

