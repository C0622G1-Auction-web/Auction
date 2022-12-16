import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../../model/user/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) {
  }
  /**
   * Create by: NguyenNQ
   * Date created: 15/12/2022
   * @return User
   */
  saveaddAcountUser(user: User): Observable<User> {
    console.log(user);
    return this.httpClient.post<User>('http://localhost:8080/api/user/v1/add', user);
  }
  findUserById(value) {
    return null;
  }


}
