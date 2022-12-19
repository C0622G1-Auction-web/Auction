import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Guide} from "../../model/guide/guide";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(private _httpClient: HttpClient) { }

  create(guide: Guide):Observable<Guide>{
    return this._httpClient.post<Guide>("http://localhost:8080/auction/api/guide", guide)
  }
}
