import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserType} from "../../model/user/user-type";
import {UserListDto} from "../../dto/userListDto";
import {User} from '../../model/user/user';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) {
  }


  getList() {
    return this._httpClient.get<UserListDto[]>(
      environment.api_url_users);
  }

  findAllUserType() {
    return this._httpClient.get<UserType[]>(
      environment.api_url_userType);
  }

  searchBy(id: any, name: any, email: any, address: any, userTypeId: any, page: any): Observable<any> {
    return this._httpClient.get<any>(environment.api_url_users + `?id=${id}&name=${name}&email=${email}&address=${address}&userTypeId=${userTypeId}&page=${page}`);
  }


  findUserById(userId: number): Observable<User> {
    return this._httpClient.get<User>(environment.userUrl + userId)
  }

}

