import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/api/v1/accounts/';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _httpClient: HttpClient,
              private _toastrService: ToastrService) {
  }

  verify(email: String, username: String): Observable<String> {
    return this._httpClient.get(API_URL + 'verify_account?email=' + email + '&username=' + username, {responseType: 'text'});
  }


  checkToken(token: String): Observable<String> {
    return this._httpClient.get(API_URL + 'token_check?token=' + token, {responseType: 'text'});
  }

  updatePass(accountId: String, token: String, password: String): Observable<String> {
    return this._httpClient.get(API_URL + 'update_pass?id=' + accountId + '&token=' + token + '&password=' + password, {responseType: 'text'});
  }

  showSuccessNotification(message: string) {
    this._toastrService.success(message, 'Thông Báo', {
      timeOut: 15000,
      progressBar: true,
      positionClass: 'toast-top-right',
      easing: 'ease-in'
    });
  }

  showErrorNotification(message: string) {
    this._toastrService.error(message, 'Lỗi', {
      timeOut: 15000,
      progressBar: true,
      positionClass: 'toast-top-right',
      easing: 'ease-in'
    });
  }

  showWarningNotification(message: string) {
    this._toastrService.warning(message, 'Cảnh báo', {
      timeOut: 15000,
      progressBar: true,
      positionClass: 'toast-top-right',
      easing: 'ease-in'
    });
  }
}
