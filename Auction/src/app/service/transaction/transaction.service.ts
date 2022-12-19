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

  findAll(): Observable<TransactionAuction[]> {
    return this._httpClient.get<TransactionAuction[]>(environment.transactionUrl)
  }
}
