import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/product/product';
import {environment} from '../../../environments/environment';
import {Auction} from '../../model/auction/auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function: Get Auction By Product Id
   * @return product if productId exist or error if does not exist
   */
  getAuctionByProductId(productId: number): Observable<Product> {
    return this._httpClient.get<Product>(environment.API_URL_AUCTION + '/auction-detail/' + productId);
  }

  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function:  Get Auction Page By Product Id
   * @param idProduct, pageNumber
   * @return page auction if productId and pageNumber exist or error if does not exist
   */
  getAuctionPageByProductId(idProduct: number, pageNumber: number): Observable<any> {
    return this._httpClient.get(environment.API_URL_AUCTION + '/tien/'
      + idProduct + '?page=' + pageNumber);
  }

  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function:  Add New Auction
   * @return auction if auction valid or error if invalid
   */
  addNewAuction(auction: Auction): Observable<Auction> {
    return this._httpClient.post<Auction>(environment.API_URL_AUCTION, auction);
  }
}

