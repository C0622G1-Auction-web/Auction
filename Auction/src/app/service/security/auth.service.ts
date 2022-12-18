import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginForm} from "../../model/security/login-form";
import {Googletoken} from "../../security/oauth2/googletoken";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Created by: DucDH
   * Date: 16/12/2022
   * Function: To login using User account
   */

  login(loginForm: LoginForm): Observable<any> {
    return this.httpClient.post<any>(environment.LOGIN_API, loginForm);
  }

  /**
   * Created by: DucDH
   * Date: 16/12/2022
   * Function: To login using google oauth2
   */

  googleLogin(googleToken: Googletoken): Observable<any> {
    return this.httpClient.post<any>(environment.GOOGLE_LOGIN_API, googleToken)
  }

}
