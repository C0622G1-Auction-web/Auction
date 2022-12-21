import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../model/user/user';
import {LockAccount} from '../../model/account/lock-account';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private httpClient: HttpClient, private _toastrService: ToastrService
  ) {
  }

  /**
   * Created by: VietNQ
   * Date: 19/12/20200
   * Function: To get account by id
   * @Param: id
   * @Return: Account if accountId found
   *          Null if accountId not found
   */
  getAccountById(accountId: number): Observable<any> {
    return this.httpClient.get(environment.NQV_GET_ACCOUNT_BY_ID_API + '/' + accountId);
  }
  /**
   * Created by: VietNQ
   * Date: 19/12/20200
   * Function: To get LockAccount
   * @Param: lockAccount
   * @Return: Account if LockAccount found
   *          Null if LockAccount not found
   */

  saveLockAcountUser(lockAccount: LockAccount): Observable<LockAccount> {
    console.log(lockAccount);
    return this.httpClient.put<User>(environment.NQV_LOCK_ACCOUNT, lockAccount);
  }
}
