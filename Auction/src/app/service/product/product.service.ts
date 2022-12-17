import { Injectable } from '@angular/core';
import {Product} from '../../model/product/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {PriceStep} from '../../model/product/price-step';
import {Category} from '../../model/product/category';
import {User} from '../../model/user/user';
import {ImgUrlProduct} from '../../model/product/img-url-product';
import {environment} from '../../../environments/environment';
import {DataResult} from "../../model/product/data_result";
import {ProductDto} from "../../model/product/iProduct_dto";
import {ReviewStatus} from "../../model/product/review-status";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product: Product[];

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  private API_URL = '  http://localhost:8080/';

  findAllPriceStep(): Observable<PriceStep[]> {
    return this.httpClient.get<PriceStep[]>(environment.api_url_list_price_step);
  }

  findAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(environment.api_url_list_category);
  }

  findAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.api_url_list_user);
  }

  findAllImageProduct(): Observable<ImgUrlProduct[]> {
    return this.httpClient.get<ImgUrlProduct[]>(environment.api_url_list_img_url);
  }

  save(product: ProductDto): Observable<Product> {
    return this.httpClient.post<Product>('http://localhost:8080/api/v1/products/create', product);
  }

  findAll(curPage: number, numberRecord: number): Observable<DataResult<ProductDto>> {
    return this.httpClient.get<DataResult<ProductDto>>(this.API_URL + 'list?page=' + (curPage - 1) + '&size=' + numberRecord );
  }
  findAllReview(): Observable<ReviewStatus[]> {
    return this.httpClient.get<ReviewStatus[]>(this.API_URL + 'listReviewStatus');
  }

}
