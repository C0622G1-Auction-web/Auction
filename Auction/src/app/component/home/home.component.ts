import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ProductService} from "../../service/product/product.service";
import {PageProduct} from "../../model/product/page-product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Category} from "../../model/product/category";
import {CategoryService} from "../../service/product/category.service";
import {ImgUrlProduct} from "../../model/product/img-url-product";
import {formatCurrency, getCurrencySymbol} from "@angular/common";
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  pageProducts: PageProduct;
  rfSearch: FormGroup;
  categorys: Category[];
  pageHasNext: number = 0;
  categoryIDSearch = '';
  auctionStatusId = '';
  isSelectedAuction = '';
  topUser: any;

  constructor(private _productService: ProductService,
              private _formBuilder: FormBuilder,
              private _categoryService: CategoryService,
              private _userService: UserService) { }

  ngOnInit(): void {
    this.rfSearch = this._formBuilder.group({
      name: [''],
      categoryID: [''],
      rangePrice: ['999999999999999999'],
      productAuctionStatus: ['']
    });
    this._categoryService.getListCategory().subscribe(data => {
      this.categorys = data;
    });
    this.gotoPage(this.rfSearch.value);
    this.selectedChangImage();
    this.getTop()
  }

  /**
   * Created: SangDD
   * Function: Get product and seach...
   * Date: 15/11/2022
   */
  gotoPage(rfSearch: any) {
    this._productService.getAllAndSearch(this.rfSearch.value).subscribe(data => {
      this.pageProducts = data;
      console.log(data);
    });
    this.pageHasNext = 0;
  }

  /**
   * Created: SangDD
   * Function: get all products and search, by page number
   * Date: 15/11/2022
   */
  gotoPageNumber(rfSearch: any, pageNumber: any) {
    this.pageHasNext += 1;
    this._productService.getAllAndSearchToPage(this.rfSearch.value, pageNumber).subscribe(data => {
      data.content.forEach(value => {
        this.pageProducts.content.push(value);
      });
    });
  }

  /**
   * Created: SangDD
   * Function: set value for rfSearch
   * Date: 15/11/2022
   */
  setValueCategorySearch(categoryId: any,
                         rangePrice: any,
                         productAuctionStatus = '',
                         name: string ) {
    this.categoryIDSearch = categoryId;
    this.rfSearch.setValue({name: name.trim(),
      categoryID: categoryId+''.trim(),
      rangePrice: rangePrice+''.trim(),
      productAuctionStatus: productAuctionStatus})
   this.gotoPage(this.rfSearch.value);
  }

  setValueAuctionProductStatusSearch(categoryId: any,
                         rangePrice: any,
                         productAuctionStatus: string,
                         name: string ) {
    if(this.isSelectedAuction == productAuctionStatus) {
      productAuctionStatus = '';
    }
    this.auctionStatusId = productAuctionStatus;
    this.rfSearch.setValue({name: name.trim(),
      categoryID: categoryId+''.trim(),
      rangePrice: rangePrice+''.trim(),
      productAuctionStatus: productAuctionStatus});
    this.isSelectedAuction = productAuctionStatus;
    this.gotoPage(this.rfSearch.value);
  }

  /**
   * Created: SangDD
   * date: 18/12/2022
   * @param event
   * @param i
   * @param j
   */
  changeImage(event: any, i: any, j: number) {
    const src = event.target.src;
    const imgs = document.querySelectorAll('.img-selected' + i);
    document.getElementById('image__main' + i).setAttribute('src', src);
    imgs.forEach(value => {
      if (value.getAttribute('value') == j+'') {
        value.classList.add('actived');
      } else {
        value.classList.remove('actived');
      }
    });
  }

  selectedChangImage() {
    setTimeout(()=> {
      const imgF = document.querySelectorAll('.carousel__images');
      console.log(imgF);
      imgF.forEach(value => {
        value.children[0]?.classList.add('actived');
      });
    }, 500)
  }

  getTop() {
    this._userService.findTopUser().subscribe(data => {
      this.topUser = data;
      console.log(data);
    })
  }
}
