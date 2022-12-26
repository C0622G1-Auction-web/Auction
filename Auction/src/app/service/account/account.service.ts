import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {LockAccount} from "../../model/account/lock-account";
import {User} from "../../model/user/user";
import { environment } from 'src/environments/environment';
const API_URL = environment.apiUrl + '/api/v1/accounts/';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient,
              // tslint:disable-next-line:variable-name
              private _toastrService: ToastrService) { }

  // tslint:disable-next-line:ban-types
  verify(email: String, username: String): Observable<String> {
    return this._httpClient.get(API_URL + 'verify_account?email=' + email + '&username=' + username, {responseType: 'text'});
  }


  // tslint:disable-next-line:ban-types
  checkToken(token: String, accountId: String): Observable<String> {
    return this._httpClient.get(API_URL + 'token_check?token=' + token + '&account=' + accountId, {responseType: 'text'});
  }

  // tslint:disable-next-line:ban-types
  updatePass(accountId: String, token: String, password: String): Observable<String> {
    // tslint:disable-next-line:max-line-length
    return this._httpClient.get(API_URL + 'update_pass?id=' + accountId + '&token=' + token + '&password=' + password, {responseType: 'text'});
  }

  showSuccessNotification(message: string) {
    this._toastrService.success(message, 'Thông Báo', {
      timeOut: 4000,
      progressBar: true,
      positionClass: 'toast-top-right',
      easing: 'ease-in'
    });
  }

  showErrorNotification(message: string) {
    this._toastrService.error(message, 'Lỗi', {
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-top-right',
      easing: 'ease-in'
    });
  }

  showWarningNotification(message: string) {
    this._toastrService.warning(message, 'Cảnh báo', {
      timeOut: 5000,
      progressBar: true,
      positionClass: 'toast-top-right',
      easing: 'ease-in'
    });
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
    return this._httpClient.put<User>(environment.NQV_LOCK_ACCOUNT, lockAccount);
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
    return this._httpClient.get(environment.NQV_GET_ACCOUNT_BY_ID_API + '/' + accountId);
  }

}
