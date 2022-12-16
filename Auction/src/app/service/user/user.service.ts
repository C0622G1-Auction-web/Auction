import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/internal/Observable';
import {User} from "../../model/user/user";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  createUser(user: User): Observable<User> {
    console.log(user)
    return this.httpClient.post<User>('http://localhost:8080/api/v1/users/create', user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.patch<User>(environment.uri_api_create_user_v1_user + '/' + user.id, user);
  }
}
