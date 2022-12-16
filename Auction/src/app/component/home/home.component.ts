import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product/product.service";
import {PageProduct} from "../../model/product/page-product";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageProducts: PageProduct[];
  rfSearch: FormGroup;

  constructor(private _productService: ProductService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.rfSearch = this._formBuilder.group({
       name: [''],
       categoryID: [''],
       rangePrice: [''],
       productAuctionStatus: ['']
    });
    this.gotoPage();
  }

  /**
   * Created: SangDD
   * Function: N/A doing...
   * Date: 15/11/2022
   */
  gotoPage() {
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
