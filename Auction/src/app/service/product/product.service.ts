import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Product} from '../../model/product/product';
import {PriceStep} from '../../model/product/price-step';
import {Category} from '../../model/product/category';
import {User} from '../../model/user/user';
import {ImgUrlProduct} from '../../model/product/img-url-product';
import {DataResult} from "../../model/product/data_result";
import {ProductDto} from "../../model/product/iProduct_dto";
import {ReviewStatus} from "../../model/product/review-status";
import {PageProduct} from "../../model/product/page-product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private product: Product[];

  private API_URL = '  http://localhost:8080/';

  // @ts-ignore
  constructor(private _httpClient: HttpClient) { }

  findAllPriceStep(): Observable<PriceStep[]> {
    return this._httpClient.get<PriceStep[]>(environment.api_url_list_price_step);
  }

  findAllCategory(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(environment.api_url_list_category);
  }

  findAllUser(): Observable<User[]> {
    return this._httpClient.get<User[]>(environment.api_url_list_user);
  }

  findAllImageProduct(): Observable<ImgUrlProduct[]> {
    return this._httpClient.get<ImgUrlProduct[]>(environment.api_url_list_img_url);
  }

  save(product: Product): Observable<Product> {
    return this._httpClient.post<Product>('http://localhost:8080/api/v1/products/create', product);
  }

  findAll(curPage: number, numberRecord: number): Observable<DataResult<ProductDto>> {
    return this._httpClient.get<DataResult<ProductDto>>(this.API_URL + 'list?page=' + (curPage - 1) + '&size=' + numberRecord);
  }

  findAllReview(): Observable<ReviewStatus[]> {
    return this._httpClient.get<ReviewStatus[]>(this.API_URL + 'listReviewStatus');
  }


  /**
   * Created: SangDD
   * Function: show page product and search
   * Date: 15/11/2022
   */
  getAllAndSearch(rfSearch: any): Observable<any> {
    return this._httpClient.post<PageProduct>(environment.productSearchUrl, rfSearch);
  }

  /**
   * Created: GiangLBH
   * Function: get all products
   * Date: 15/11/2022
   */
  getAll(): Observable<PageProduct> {
    return this._httpClient.get<PageProduct>(environment.api_url_products);
  }
}
