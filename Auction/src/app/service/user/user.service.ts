import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  /**
   * Create by: SonPT
   * Date created: 15/12/2022
   * @return User
   */

   findUserById (value : number) : Observable<User>{
    return this._httpClient.get<User>(environment.userUrl + "find/"  + value);
  }
}
