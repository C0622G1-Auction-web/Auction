import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserType} from "../../model/user/user-type";
import {UserListDto} from "../../dto/user-list-dto";
import {User} from '../../model/user/user';
import {Observable} from 'rxjs';
import {UserEditDto} from "../../dto/user-edit-dto";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) {
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  /**
   * Create by: HaiNT
   * Date created: 15/12/2022
   * @return  UserType[]
   */
  findAllUserType() {
    return this._httpClient.get<UserType[]>(
      environment.api_url_userType);
  }

  /**
   * Create by: HaiNT
   * Date created: 15/12/2022
   * @param rfSearch
   * @param pageNumber
   * return page user by param
   */
  searchBy(rfSearch: any, pageNumber: any) {
    return this._httpClient.get<any>(environment.api_url_list_user +
      '/list?page=' + pageNumber +
      '&id=' + rfSearch.idSearch +
      '&name=' + rfSearch.nameSearch +
      '&email=' + rfSearch.emailSearch +
      '&address=' + rfSearch.addressSearch +
      '&userType=' + rfSearch.userTypeSearch);
  }

  /**
   * Create by: HaiNT
   * @param id
   * return  user by id
   */
  findUserById(id: number): Observable<User> {
    return this._httpClient.get<User>(environment.api_url_list_user + '/' + id,this.httpOptions)
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


  updateByAdim(id: any, user: any): Observable<UserEditDto> {
    return this._httpClient.put<UserEditDto>(environment.api_url_list_user + '/' + id, user);

  }
}

