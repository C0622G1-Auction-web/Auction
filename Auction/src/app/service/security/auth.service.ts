import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginForm} from "../../model/security/login-form";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_API = environment.URL_API;

  constructor(
    private httpClient: HttpClient
  ) { }

  login(loginForm: LoginForm): Observable<any> {
    return this.httpClient.post<any>(this.URL_API + '/api/auth/signin', loginForm);
  }

}
