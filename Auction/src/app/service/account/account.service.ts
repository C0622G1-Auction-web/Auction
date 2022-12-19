import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
const API_URL = 'http://localhost:8080/api/v1/accounts/';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _httpClient: HttpClient,
              private _toastrService: ToastrService) { }

  verify(email: String, username: String):Observable<String> {
   return this._httpClient.get(API_URL+'verify_account?email='+email+'&username='+username,{ responseType: 'text' });
  }


}
