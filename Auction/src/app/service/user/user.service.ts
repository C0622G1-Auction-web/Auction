import {User} from '../../model/user/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {
  }

  getAllUser(): Observable<User[]> {
    return null;
  }

  findUserById(userId: number): Observable<User> {
    return this._httpClient.get<User>(environment.userUrl + userId);
  }
}
