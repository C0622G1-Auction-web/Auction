import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product/product.service";
import {PageProduct} from "../../model/product/page-product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Category} from "../../model/product/category";
import {CategoryService} from "../../service/product/category.service";
import {ImgUrlProduct} from "../../model/product/img-url-product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageProducts: PageProduct;
  rfSearch: FormGroup;
  categorys: Category[];
  imgUrlProduct: ImgUrlProduct;

  constructor(private _productService: ProductService,
              private _formBuilder: FormBuilder,
              private _categoryService: CategoryService,) { }

  ngOnInit(): void {
    this.rfSearch = this._formBuilder.group({
      name: [''],
      categoryID: [''],
      rangePrice: ['0'],
      productAuctionStatus: ['']
    });
    this._categoryService.getListCategory().subscribe(data => {
      this.categorys = data;
    });
    this.gotoPage();
  }

  /**
   * Created: SangDD
   * Function: N/A doing...
   * Date: 15/11/2022
   */
  gotoPage() {
    console.log(this.rfSearch.value);
    this._productService.getAllAndSearch(this.rfSearch.value).subscribe(data => {
      this.pageProducts = data;
      console.log(data);
    });
  }

  /**
   * Created: SangDD
   * Function: set value for rfSearch
   * Date: 15/11/2022
   * @param s
   */
  setValueCategorySearch(s: string) {
   this.rfSearch.value.name = s;
   console.log(this.rfSearch.value);
   this.gotoPage();
  }

}
