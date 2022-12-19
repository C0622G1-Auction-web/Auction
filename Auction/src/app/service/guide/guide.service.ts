<<<<<<< HEAD
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Guide} from '../../model/guide/guide';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
=======
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Guide} from "../../model/guide/guide";
import {Observable} from "rxjs";
>>>>>>> 0fdda8cd5056403da2d913d5a6c5d835cff1563b

@Injectable({
  providedIn: 'root'
})
export class GuideService {

<<<<<<< HEAD
  constructor(private _httpClient: HttpClient) {
  }


  create(guide: Guide):Observable<Guide>{
    return this._httpClient.post<Guide>(environment.API_URL_GUIDE, guide)
  }
  update(guide: Guide):Observable<void>{
    return this._httpClient.put<void>(environment.API_URL_GUIDE,guide)
  }
  getGuideById(id: number):Observable<Guide> {
    return this._httpClient.get<Guide>(environment.API_URL_GUIDE+'/find/'+id)
=======
  constructor(private _httpClient: HttpClient) { }

  create(guide: Guide):Observable<Guide>{
    return this._httpClient.post<Guide>("http://localhost:8080/auction/api/guide", guide)
>>>>>>> 0fdda8cd5056403da2d913d5a6c5d835cff1563b
  }
}
