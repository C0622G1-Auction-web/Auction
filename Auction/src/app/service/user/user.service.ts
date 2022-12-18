
import {User} from '../../model/user/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) { }

  getAllUser(): Observable<User[]> {
    return null;
  }

  findUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(environment.userUrl + userId)
  }

  createUser(user: User): Observable<User> {
    console.log(user)
    return this.httpClient.post<User>(environment.uri_api_create_user_v1_user, user);
  }


}
