import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImgUrlProduct } from 'src/app/model/product/img-url-product';
import { environment } from 'src/environments/environment';

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

  constructor(private _httpClient: HttpClient) {}

  create(image): Observable<ImgUrlProduct> {
    return this._httpClient.post<ImgUrlProduct>(environment.api_url_create_img_url, image, this.httpOptions);
  }

  getListImgProductId(id: number):Observable<ImgUrlProduct[]> {
    return this._httpClient.get<ImgUrlProduct[]>(environment.api_url_list_img_url + "/" + id);
  }
}
