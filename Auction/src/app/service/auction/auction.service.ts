import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/product/product';
import {environment} from '../../../environments/environment';
import {Auction} from '../../model/auction/auction';
import {PageAuctionProductHistory} from "../../model/auction/page-auction-product-history";

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
    return this._httpClient.get(environment.API_URL_AUCTION + '/auction-product/'
      + idProduct + '?page=' + pageNumber);
  }

  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function:  Get Auction By Product Id
   * @param idProduct, pageNumber
   * @return page auction if productId and pageNumber exist or error if does not exist
   */
  getAuctionDetailByProductId(idProduct: number): Observable<any> {
    return this._httpClient.get(environment.API_URL_AUCTION + '/auction/' + idProduct);
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

  /**
   * Created by: AnhTDQ,
   * Date created: 16/12/2022
   * Function:  show list product of user
   * @return Page prodcut
   */

  findAll(id: number, curPage: number): Observable<PageAuctionProductHistory> {
    return this._httpClient.get<PageAuctionProductHistory>(environment.api_url_product_auction_history + id + '?page=' + curPage);
  }
}
