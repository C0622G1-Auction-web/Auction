import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransactionAuction} from "../../model/transaction/transaction";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private _httpClient: HttpClient) {

  }

  /**
   * Created HuyNV
   * Date created 16/12/2022
   * Function: List transaction
   */
  findAll(): Observable<TransactionAuction> {
    return this._httpClient.get<TransactionAuction>(environment.transactionUrl)
  }

  /**
   * Created HuyNV
   * Date created 16/12/2022
   * Function: search transaction
   */
  search(rfSearch: any): Observable<TransactionAuction[]> {
    if (!(rfSearch.searchUserPost.length) && !(rfSearch.searchUserBuying.length)
      && !(rfSearch.searchProductName.length)
      && !(rfSearch.searchCurrentPrice.length)
      && !(rfSearch.searchPayStatus.length)) {
      return this._httpClient.get<TransactionAuction[]>(environment.transactionUrl);
    }
    return this._httpClient.get<TransactionAuction[]>(environment.transactionUrl +
      '?product.user.firstName_like=' + rfSearch.searchUserPost +
      '&auction.user.firstName_like=' + rfSearch.searchUserBuying +
      '&product.name_like=' + rfSearch.searchProductName +
      '&auction.currentPrice=' + rfSearch.searchCurrentPrice +
      '&auction.auctionStatus_like=' + rfSearch.searchPayStatus);
  }
}
