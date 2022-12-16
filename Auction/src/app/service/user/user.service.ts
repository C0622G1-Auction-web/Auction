<<<<<<< HEAD
import {Observable} from 'rxjs';
=======

import {User} from '../../model/user/user';
>>>>>>> 3b5547d1b981ef4353256cdb4c4f4146a90c546a
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
<<<<<<< HEAD
import {User} from '../../model/user/user';
=======
import {Observable} from "rxjs";
>>>>>>> 3b5547d1b981ef4353256cdb4c4f4146a90c546a


@Injectable({
  providedIn: 'root'
})
export class UserService {


<<<<<<< HEAD
  constructor(private httpClient: HttpClient) {
=======
  constructor(private httpClient: HttpClient) { }

  getAllUser(): Observable<User[]> {
    return null;
>>>>>>> 3b5547d1b981ef4353256cdb4c4f4146a90c546a
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
