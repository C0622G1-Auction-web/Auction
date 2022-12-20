import {Injectable} from '@angular/core';
import {Product} from '../../model/product/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PriceStep} from '../../model/product/price-step';
import {Category} from '../../model/product/category';
import {User} from '../../model/user/user';
import {ImgUrlProduct} from '../../model/product/img-url-product';
import {environment} from '../../../environments/environment';
<<<<<<< HEAD
import {DataResult} from "../../model/product/data_result";
import {IProductDto} from "../../model/product/iproduct-dto";
import {ReviewStatus} from "../../model/product/review-status";
import {PageProductHistory} from "../../model/product/dto/page-product-history";
=======
import {DataResult} from '../../model/product/data_result';
<<<<<<< HEAD
=======
import {ProductDto} from '../../model/product/iProduct_dto';
>>>>>>> 1c04260d79ced8bb06fc31fbbc4f0d73d4a42edc
import {ReviewStatus} from '../../model/product/review-status';
>>>>>>> 5714c40573654cb9aae9819492ecce425c282eee

@Injectable({
  providedIn: 'root'
})
export class ProductService {

<<<<<<< HEAD
=======
  // tslint:disable-next-line:variable-name
<<<<<<< HEAD
  constructor(private _httpClient: HttpClient) { }
  private product: Product[];
  private API_URL = 'http://localhost:8080/api/v1/product/list';
=======
>>>>>>> 5714c40573654cb9aae9819492ecce425c282eee
  constructor(private _httpClient: HttpClient) {
  }

  // constructor(private httpClient: HttpClient) { }
>>>>>>> 1c04260d79ced8bb06fc31fbbc4f0d73d4a42edc

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

  save(product): Observable<Product> {
    return this._httpClient.post<Product>('http://localhost:8080/api/v1/products/create', product);
  }

<<<<<<< HEAD

  /**
   * Created: AnhTDQ
   * Function: show page product
   * Date: 15/11/2022
   */
  findAll(id: number, curPage: number): Observable<PageProductHistory> {
    return this._httpClient.get<PageProductHistory>(environment.api_url_product_history_list+ id + '?page=' + curPage);
=======
<<<<<<< HEAD
  findAll(curPage: number, numberRecord: number): Observable<DataResult<Product>> {
    // tslint:disable-next-line:max-line-length
    return this._httpClient.get<DataResult<Product>>('http://localhost:8080/api/v1/product/list');
=======
  findAll(curPage: number, numberRecord: number): Observable<DataResult<ProductDto>> {
    return this._httpClient.get<DataResult<ProductDto>>(this.API_URL + 'list?page=' + (curPage - 1) + '&size=' + numberRecord);
>>>>>>> 1c04260d79ced8bb06fc31fbbc4f0d73d4a42edc
>>>>>>> 5714c40573654cb9aae9819492ecce425c282eee
  }


  cancelProduct(id: number): Observable<void> {
    return this._httpClient.delete<void>('http://localhost:8080/api/v1/products/canceled/{id}' + id);
  }

  /**
   * Created: SangDD
   * Function: show page product and search
   * Date: 15/11/2022
   */
  getAllAndSearch(rfSearch: any): Observable<any> {
    return this._httpClient.get(environment.productSearchUrl, rfSearch);
  }
}
