import {Observable} from 'rxjs';
import {User} from '../../model/user/user';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private _httpClient: HttpClient) {

  }

  getAllUser(): Observable<User[]> {
    return null;
  }

  /**
   * Create by: NguyenNQ
   * Date created: 15/12/2022
   * @return User
   */

  saveaddAcountUser(user: User): Observable<User> {
    console.log(user);
    return this._httpClient.post<User>('http://localhost:8080/api/user/v1/add', user);
  }


  /**
   * Create by: HungNV
   * Date created: 16/12/2022
   * @return User
   */

  findUserById (value : number) : Observable<User>{
    return this._httpClient.get<User>(environment.userUrl + "find/"  + value);
  }
}
