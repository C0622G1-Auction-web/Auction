import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";

import {ImgUrlProduct} from "../../model/product/img-url-product";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageProductService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',  // chấp nhận đường dẫn từ phía back-end
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'  // chấp nhận các method từ phía back-end
  };
  constructor(private _httpClient: HttpClient) { }
  create(image): Observable<ImgUrlProduct> {
    return this._httpClient.post<ImgUrlProduct>(environment.imageUrl + "/create", image, this.httpOptions)
  }

}
