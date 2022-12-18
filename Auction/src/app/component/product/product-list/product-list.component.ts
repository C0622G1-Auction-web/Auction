import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductService} from '../../../service/product/product.service';
import {Product} from '../../../model/product/product';
import {ProductDto} from '../../../model/product/iProduct_dto';
import {TokenService} from '../../../service/security/token.service';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  page = 1;
  pageSize = 5;
  action: boolean;


  total$: Observable<number>;
  iproductDto$: BehaviorSubject<Product[]>;

  constructor(private productService: ProductService, tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  /**
   * Created by: AnhTDQ,
   * Date created: 15/12/2022
   * Function: get list of status of product auctions
   * @return list Product , page
   */

  public findAll() {
    this.productService.findAll(this.page, this.pageSize).subscribe(value => {
      if (value != null) {
        this.action = true;
        this.total$ = new BehaviorSubject<number>(value.totalElements);
        this.iproductDto$ = new BehaviorSubject<Product[]>(value.content);

      console.log('a');
      if (value != null) {
        this.action = true;
        this.total$ = new BehaviorSubject<number>(value.totalElements);
        this.iproductDto$ = new BehaviorSubject<ProductDto[]>(value.content);

      } else {
        this.action = false;
      }
  }
}
