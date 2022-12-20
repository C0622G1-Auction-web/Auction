import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Guide} from '../../model/guide/guide';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GuideService {

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
  }
}
