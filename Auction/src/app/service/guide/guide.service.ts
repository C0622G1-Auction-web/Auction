import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Guide} from '../../model/guide/guide';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {ImgUrlGuideDto} from "../../model/guide/img-url-guide";

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

  searchByContent(title: string): Observable<Guide[]> {
    return this._httpClient.get<Guide[]>(environment.API_URL_GUIDE + `?title=` + title);
  }

  findImageGuide(id: number): Observable<ImgUrlGuideDto[]> {
    return this._httpClient.get<ImgUrlGuideDto[]>('http://localhost:8080/api/v1/guide/image/find/' + id);
  }

}
