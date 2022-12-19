import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransactionAuction} from "../../model/transaction/transaction";
import {environment} from "../../../environments/environment";
import {PageTransaction} from "../../model/transaction/page-transaction";


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
  findAll(searchTransaction: any, pageNumber): Observable<PageTransaction> {
    return this._httpClient.post<PageTransaction>(
      environment.transactionUrl + '?page=' + pageNumber,
      searchTransaction);
  }

  /**
   * Created HuyNV
   * Date created 16/12/2022
   * Function: delete transaction
   */
  findByListId(deleteIds: number[]): Observable<TransactionAuction[]> {
    return this._httpClient.post<TransactionAuction[]>(environment.transactionFindByListIdUrl, deleteIds);
  }

  deleteByListId(deleteIds: number[]): Observable<any> {
    return this._httpClient.post<any>(environment.transactionDeleteUrl, deleteIds);
  }

}
