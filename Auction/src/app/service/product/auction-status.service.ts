import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuctionStatus} from '../../model/product/auction-status';

@Injectable({
  providedIn: 'root'
})

/**
 * Create by: GiangLBH
 * Use for Screen: Product-manager Role: Admin
 * Date: 17/12/2022
 */
export class AuctionStatusService {

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Create by: GiangLBH
   * Function: get List Auction Status
   * Date: 17/12/2022
   */
  getListAuctionStatus(): Observable<AuctionStatus[]> {
    return this._httpClient.get<AuctionStatus[]>(environment.api_url_list_auction_status);
  }
}
