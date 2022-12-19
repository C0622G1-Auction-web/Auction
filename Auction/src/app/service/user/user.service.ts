import {User} from '../../model/user/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  createUser(user: User): Observable<User> {
    console.log(user)
    return this.httpClient.post<User>(environment.uri_api_create_user_v1_user, user);
  }

  getAllUser(): Observable<User[]> {
    return null;
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(environment.uri_api_update_user_v1_user + '/' + user.id, user);
  }

  findUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(environment.userUrl + userId);
  }
  findUserByIdServer(userId: number): Observable<User> {
    return this.httpClient.get<User>(environment.uri_api_find_by_id_user_v1_user + userId);
  }

}
