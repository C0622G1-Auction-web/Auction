import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

<<<<<<< HEAD

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {  }
  // constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<User> {
    console.log(user);
    return this._httpClient.post<User>('http://localhost:8080/api/v1/users/create', user);
=======
  constructor(private httpClient: HttpClient) {
  }

  createUser(user: User): Observable<User> {
    console.log(user)
    return this.httpClient.post<User>(environment.uri_api_create_user_v1_user, user);
>>>>>>> f4f689efca083ce6b451b5211af36ead99819b55
  }

  getAllUser(): Observable<User[]> {
    return null;
  }
<<<<<<< HEAD
=======

  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(environment.uri_api_update_user_v1_user + '/' + user.id, user);
  }
>>>>>>> f4f689efca083ce6b451b5211af36ead99819b55

    // updateUser(user: User): Observable<User> {
    //   return this._httpClient.patch<User>(environment.uri_api_create_user_v1_user + '/' + user.id, user);
    // }
  findUserById(userId: number): Observable<User> {
<<<<<<< HEAD
    return this._httpClient.get<User>(environment.userUrl + userId);
=======
    return this.httpClient.get<User>(environment.userUrl + userId);
  }
  findUserByIdServer(userId: number): Observable<User> {
    return this.httpClient.get<User>(environment.uri_api_find_by_id_user_v1_user + userId);
  }

  createUser(user: User): Observable<User> {
    console.log(user)
    return this.httpClient.post<User>(environment.uri_api_create_user_v1_user, user);
>>>>>>> f4f689efca083ce6b451b5211af36ead99819b55
  }
}
