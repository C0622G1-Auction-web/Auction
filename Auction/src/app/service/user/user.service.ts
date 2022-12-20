import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guide } from 'src/app/model/guide/guide';
import { User } from 'src/app/model/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {  }
  // constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<User> {
    console.log(user);
    return this._httpClient.post<User>('http://localhost:8080/api/v1/users/create', user);
  }

  findAllUser() {
    return this._httpClient.get<User[]>(
      environment.api_url_list_user);
  }

    // updateUser(user: User): Observable<User> {
    //   return this._httpClient.patch<User>(environment.uri_api_create_user_v1_user + '/' + user.id, user);
    // }
  findUserById(userId: number): Observable<User> {
    return this._httpClient.get<User>(environment.userUrl + userId);
  }
}
