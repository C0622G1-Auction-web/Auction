import {Injectable} from '@angular/core';
import {Product} from "../../model/product/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ProductDto} from "../../model/product/product-dto";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) {
  }

  saveProduct(product: ProductDto): Observable<number> {
    return this._httpClient.post<number>(environment.productUrl + "/create", product)
  }

  findById(id: number): Observable<Product> {
    return this._httpClient.get<Product>(environment.productUrl + "/" + id)
  }
}
