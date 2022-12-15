import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResult} from "../../model/product/data_result";
import {ProductDto} from "../../model/product/iProduct_dto";
import {ReviewStatus} from "../../model/product/review_Status";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = '  http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  findAll(curPage: number, numberRecord: number): Observable<DataResult<ProductDto>> {
    return this.httpClient.get<DataResult<ProductDto>>(this.API_URL + 'list?page=' + (curPage - 1) + '&size=' + numberRecord );
  }
  findAllReview(): Observable<ReviewStatus[]> {
    return this.httpClient.get<ReviewStatus[]>(this.API_URL + 'listReviewStatus');
  }

}
