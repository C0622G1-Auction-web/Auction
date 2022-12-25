import { Injectable } from '@angular/core';
import {identity, Observable} from "rxjs";
import {Nofication} from "../../model/user/nofication";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceByUserService {

  constructor(private _httpClient: HttpClient) { }
  getAllNoficationByUser(userId: any): Observable<Nofication[]> {
    return this._httpClient.get<Nofication[]>(environment.URL_API_GETNOFICATION_BY_USER + '/' + userId);
  };

  getAllNoficationByAdmin(): Observable<Nofication[]> {
    return this._httpClient.get<Nofication[]>(environment.URL_API_GETNOFICATION_BY_USER + '/admin');
  };

  setNoficationed(notification: Nofication): Observable<Nofication> {
    return this._httpClient.get<Nofication>(environment.URL_API_GETNOFICATION_BY_USER + '/noficationed/' + notification.id);
  }
}
