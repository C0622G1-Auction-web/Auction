<<<<<<< HEAD
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Guide} from '../../model/guide/guide';
import {Observable} from 'rxjs';
=======
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Guide} from "../../model/guide/guide";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
>>>>>>> 5d7f77c59acf7ddf622cf16a4ab0428f1f3e4ebe

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {
  }

<<<<<<< HEAD
  create(guide: Guide): Observable<Guide> {
    return this._httpClient.post<Guide>('http://localhost:8080/auction/api/guide', guide);
=======
  create(guide: Guide):Observable<Guide>{
    return this._httpClient.post<Guide>(environment.API_URL_GUIDE, guide)
  }
  update(guide: Guide):Observable<void>{
    return this._httpClient.put<void>(environment.API_URL_GUIDE,guide)
  }
  getGuideById(id: number):Observable<Guide> {
    return this._httpClient.get<Guide>(environment.API_URL_GUIDE+'/find/'+id)
>>>>>>> 5d7f77c59acf7ddf622cf16a4ab0428f1f3e4ebe
  }
}
