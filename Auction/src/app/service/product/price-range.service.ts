import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../model/product/category';
import {environment} from '../../../environments/environment';
import {ProductPriceRange} from '../../model/product/product-price-range';

@Injectable({
  providedIn: 'root'
})

/**
 * Create by: GiangLBH
 * Use for Screen: Product-manager Role: Admin
 * Date: 17/12/2022
 */
export class PriceRangeService {

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Create by: GiangLBH
   * Function: get List Price Range of product
   * Date: 17/12/2022
   */
  getListPriceRange(): Observable<ProductPriceRange[]> {
    return this._httpClient.get<ProductPriceRange[]>(environment.api_url_list_price_range);
  }
}
