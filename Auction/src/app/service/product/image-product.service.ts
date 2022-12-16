import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImgUrlProduct} from "../../model/product/img-url-product";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageProductService {

  constructor(private _httpClient: HttpClient) { }

  create(image: ImgUrlProduct): Observable<ImgUrlProduct> {
    return this._httpClient.post<ImgUrlProduct>(environment.imageUrl + "/create", image)
  }
}
