import {Injectable} from '@angular/core';

import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../../model/product/product';
import {environment} from '../../../environments/environment';

import {ReviewStatus} from '../../model/product/review-status';
import {PageProduct} from '../../model/product/page-product';
import {ProductDelete} from '../../model/product/product-delete';
import {ProductDtoRoleAdmin} from '../../model/product/product-dto-role-admin';
import {Reason} from '../../model/product/reason';
import {DataResult} from '../../model/product/data_result';
import {catchError} from 'rxjs/operators';
import {ProductDto} from '../../model/product/iProduct_dto';
import {ImgDetailDto} from "../../model/product/img-detail-dto";
import {PageProductDto} from "../../model/product/page-product-dto";



@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private product: Product[];
  private productDetailId: any;


  constructor(protected _httpClient: HttpClient) {
  }

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

  private API_URL = 'http://localhost:8080/';

  /**
   * Created: HungNV
   * Function: create new product
   * Date: 16/11/2022
   */
  save(productDto): Observable<Product> {
    return this._httpClient.post<Product>(environment.productUrl + '/create', JSON.stringify(productDto), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  findAll(curPage: number, numberRecord: number): Observable<DataResult<ProductDto>> {
    return this._httpClient.get<DataResult<ProductDto>>(this.API_URL + 'list?page=' + (curPage - 1) + '&size=' + numberRecord);
  }

  /**
   * Created: SonPT
   * date: 20/12/2022
   */
  addProduct(productDto: ProductDto): Observable<Product> {
    return this._httpClient.post<Product>('http://localhost:8080/api/v1/products/create', productDto);
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
   * Function: get all and search Products
   * Date: 15/11/2022
   */
  getPageProductRoleAdmin(searchProduct: any, pageNumber): Observable<PageProductDto> {
    return this._httpClient.post<PageProductDto>(
      environment.api_url_products + '?page=' + pageNumber,
      searchProduct);
  }

  getAllAndSearchToPage(rfSearch: any, pageNumber: any) {
    return this._httpClient.post<PageProduct>(environment.productSearchUrl + '?page=' + pageNumber, rfSearch);
  }
  /**
   * Created: GiangLBH
   * Function: find product by selected ids
   * Date: 15/11/2022
   */
  findByListId(deleteIds: number[]): Observable<ProductDelete[]> {
    return this._httpClient.post<ProductDelete[]>(environment.api_url_search_by_list_id, deleteIds);
  }

  /**
   * Created: GiangLBH
   * Function: delete product by selected ids
   * Date: 15/11/2022
   */
  delete(deleteIds: number[]): Observable<any> {
    return this._httpClient.post<any>(environment.api_url_remove_products, deleteIds);
  }

  /**
   * Created: GiangLBH
   * Function: find product by selected ids
   * Date: 15/11/2022
   */
  findByDtoId(id: number): Observable<ProductDtoRoleAdmin> {
    return this._httpClient.get<ProductDtoRoleAdmin>(environment.api_url_find_by_id + id);
  }

  /**
   * Created: GiangLBH
   * Function: review product
   * Date: 15/11/2022
   */
  review(id: number): Observable<any> {
    return this._httpClient.get<any>(environment.api_url_review_product + id);
  }

  /**
   * Created: GiangLBH
   * Function: do not review product
   * Date: 15/11/2022
   */
  doNotReview(id: number): Observable<any> {
    return this._httpClient.get<any>(environment.api_url_do_not_review_product + id);
  }

  /**
   * Created: GiangLBH
   * Function: writeReason
   * Date: 15/11/2022
   */
  writeReason(reason: Reason): Observable<any> {
    return this._httpClient.post<any>(environment.api_url_write_reason, reason);
  }

  /**
   * Created: GiangLBH
   * Function: get Reason
   * Date: 15/11/2022
   */
  getReason(id: number): Observable<Reason> {
    return this._httpClient.get<Reason>(environment.api_url_get_reason + id);
  }

  findByIdd(id: number): Observable<Product> {
    return this._httpClient.get<Product>(environment.productUrl + "/" + id)

  }

  update(productDto, id): Observable<Product> {
    return this._httpClient.put<Product>(environment.productUrl + '/update/' + id, productDto);
  }

  getProductDetailId() {
    console.log('Lay ra id', this.productDetailId);
    return this.productDetailId;
  }

  setProductDetailId(id: any) {
    console.log('tao gia tri cho id', id);
    this.productDetailId = id;
  }

  getImgsByProductId(id: number): Observable<ImgDetailDto[]> {
    return this._httpClient.get<ImgDetailDto[]>(environment.api_url_get_imgs + id);
  }
}
