import {Injectable} from '@angular/core';
import {Product} from '../../model/product/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PriceStep} from '../../model/product/price-step';
import {Category} from '../../model/product/category';
import {User} from '../../model/user/user';
import {ImgUrlProduct} from '../../model/product/img-url-product';
import {environment} from '../../../environments/environment';
import {DataResult} from '../../model/product/data_result';
import {ProductDto} from '../../model/product/iProduct_dto';
import {ReviewStatus} from '../../model/product/review-status';
import {PageProduct} from '../../model/product/page-product';
import {ProductDelete} from '../../model/product/product-delete';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private product: Product[];

  private API_URL = '  http://localhost:8080/';

  // @ts-ignore
  constructor(private _httpClient: HttpClient) {
  }

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
    // return this._httpClient.get<PageProduct>(environment.productSearchUrl, rfSearch);
    return this._httpClient.post<PageProduct>(environment.productSearchUrl, rfSearch);
  }

  /**
   * Created: GiangLBH
   * Function: get all and search Products
   * Date: 15/11/2022
   */
  getPageProductRoleAdmin(searchProduct: any, pageNumber): Observable<PageProduct> {
    return this._httpClient.post<PageProduct>(
      environment.api_url_products + '?page=' + pageNumber,
      searchProduct);
  }

  /**
   * Created: GiangLBH
   * Function: find product by selected ids
   * Date: 15/11/2022
   */
  findByListId(deleteIds: number[]): Observable<ProductDelete[]> {
    return this._httpClient.post<ProductDelete[]>(environment.api_url_search_by_list_id, deleteIds);
  }

  delete(deleteIds: number[]): Observable<any> {
    return this._httpClient.post<any>(environment.api_url_remove_products, deleteIds);
  }
}
