import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {HttpClient, HttpHeaders} from "@angular/common/http";
=======
import {HttpClient} from "@angular/common/http";
>>>>>>> 15fbba97fa97a0a6e00e561a2462e4cda7f49af3
import {ImgUrlProduct} from "../../model/product/img-url-product";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

<<<<<<< HEAD

=======
>>>>>>> 15fbba97fa97a0a6e00e561a2462e4cda7f49af3
@Injectable({
  providedIn: 'root'
})
export class ImageProductService {
<<<<<<< HEAD
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',  // chấp nhận đường dẫn từ phía back-end
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'  // chấp nhận các method từ phía back-end
  };
  constructor(private _httpClient: HttpClient) { }
  create(image): Observable<ImgUrlProduct> {
    return this._httpClient.post<ImgUrlProduct>(environment.imageUrl + "/create", image,this.httpOptions)
=======

  constructor(private _httpClient: HttpClient) { }

  create(image: ImgUrlProduct): Observable<ImgUrlProduct> {
    return this._httpClient.post<ImgUrlProduct>(environment.imageUrl + "/create", image)
>>>>>>> 15fbba97fa97a0a6e00e561a2462e4cda7f49af3
  }
}
