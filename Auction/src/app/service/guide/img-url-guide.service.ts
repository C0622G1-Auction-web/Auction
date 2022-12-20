import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImgUrlGuideDto} from "../../model/guide/img-url-guide";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImgUrlGuideService {

  constructor(private _httpClient: HttpClient) { }

  create(image: ImgUrlGuideDto):Observable<void>{
    return this._httpClient.post<void>(environment.API_URL_GUIDE+'/image', image)
  }
  getListImage(id:number):Observable<ImgUrlGuideDto[]>{
    return this._httpClient.get<ImgUrlGuideDto[]>(environment.API_URL_GUIDE+'/image/find/'+id)
  }

  delete(id: number):Observable<ImgUrlGuideDto> {
    return this._httpClient.delete<ImgUrlGuideDto>(environment.API_URL_GUIDE+'/image/delete/'+id)
  }
}
