import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product/product.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {PageProduct} from '../../../model/product/page-product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../model/product/category';
import {ProductPriceRange} from '../../../model/product/product-price-range';
import {CategoryService} from '../../../service/product/category.service';
import {PriceRangeService} from '../../../service/product/price-range.service';
import {AuctionStatusService} from '../../../service/product/auction-status.service';
import {AuctionStatus} from '../../../model/product/auction-status';
import {ProductDelete} from '../../../model/product/product-delete';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})

/**
 * Create by: GiangLBH
 * Screen: Product-manager Role: Admin
 * Date: 17/12/2022
 */
export class ListProductsComponent implements OnInit {

  pageProducts: PageProduct;
  rfSearch: FormGroup;
  categories: Category[];
  auctionStatus: AuctionStatus[];
  priceRanges: ProductPriceRange[];
  deleteIds: number[];
  deleteProducts: ProductDelete[];
  checkedAll: boolean;

  constructor(private _productService: ProductService,
              private _notificationService: NotificationService,
              private _formBuilder: FormBuilder,
              private _categoryService: CategoryService,
              private _auctionStatusService: AuctionStatusService,
              private _priceRangeService: PriceRangeService,
              private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getAuctionStatus();
    this.getPriceRanges();
    this.createSearchForm();
    this.searchByRoleAdmin(0);
    this.deleteIds = [];
    this.checkedAll = false;
  }

  /**
   * Create by: GiangLBH
   * Function: Search by role admin
   * @Param pageNumber
   * Date: 17/12/2022
   */
  searchByRoleAdmin(pageNumber: number) {
    console.log("vao page");
    console.log(this.rfSearch.value);
    this._productService.getPageProductRoleAdmin(this.rfSearch.value, pageNumber).subscribe(data => {
      console.log(data);
      this.pageProducts = data;
    }, error => {
      this._notificationService.showErrorNotification('Không thể kết nối đến Server.');
    });
  }

  /**
   * Create by: GiangLBH
   * Function: Create search form
   * Date: 17/12/2022
   */
  createSearchForm() {
    this.rfSearch = this._formBuilder.group({
      productName: ['', [
        Validators.pattern('^[A-Za-z0-9]+$'),
        Validators.maxLength(50)
      ]],
      categoryName: [''],
      sellerName: ['', [
        Validators.pattern('^[A-Za-z]+$'),
        Validators.maxLength(50)
      ]],
      priceRange: [1],
      auctionStatusName: ['']
    });
  }

  /**
   * Create by: GiangLBH
   * Function: submit search Form to search
   * Date: 17/12/2022
   */
  resetFormAndData() {
    this.ngOnInit();
  }

  /**
   * Create by: GiangLBH
   * Function: go to page clicked in Pagination
   * Date: 17/12/2022
   */
  gotoPage(pageNumber: number) {
    this.searchByRoleAdmin(pageNumber);
  }

  /**
   * Create by: GiangLBH
   * Function: select/cancel id of product to delete
   * Date: 17/12/2022
   */
  addToDelete(id: number) {
    const index = this.deleteIds.indexOf(id, 0);
    index > -1 ? this.deleteIds.splice(index, 1) : this.deleteIds.push(id);
  }

  /**
   * Create by: GiangLBH
   * Function: select All/cancel All id of product in page to delete
   * Date: 17/12/2022
   */
  addAllToDelete() {
    this.checkedAll = true;
    for (let value of this.pageProducts.content) {
      if (!this.deleteIds.includes(value.id)) {
        this.checkedAll = false;
        break;
      }
    }
    if (this.checkedAll) {
      for (let value of this.pageProducts.content) {
        const index = this.deleteIds.indexOf(value.id, 0);
        this.deleteIds.splice(index, 1);
      }
    } else {
      for (let value of this.pageProducts.content) {
        const index = this.deleteIds.indexOf(value.id, 0);
        if (index == -1) {
          this.deleteIds.push(value.id);
        }
      }
    }
  }

  /**
   * Create by: GiangLBH
   * Function: find Product to delete by list selected ids then send to confirm modal
   * Date: 17/12/2022
   */
  sendToDeleteGroupModal() {
    this.deleteProducts = [];
    this._productService.findByListId(this.deleteIds).subscribe(data => {
      this.deleteProducts = data;
    }, error => {
      this._notificationService.showErrorNotification('Không thể tìm thấy sản phẩm.');
    });
  }

  /**
   * Create by: GiangLBH
   * Function: delete Products
   * Date: 17/12/2022
   */
  delete() {
    this._productService.delete(this.deleteIds).subscribe(data => {
      this._notificationService.showSuccessNotification('Xoá thành công.');
    }, error => {
      this._notificationService.showErrorNotification('Có lỗi khi xoá.');
    }, () => {
      this.ngOnInit();
    });
  }

  /**
   * Create by: GiangLBH
   * Function: get list categories from backend (to search)
   * Date: 17/12/2022
   */
  getCategories() {
    this._categoryService.getListCategory().subscribe(
      data => {
        this.categories = data;
      }, error => {
        this._notificationService.showErrorNotification('Có lỗi khi tải dữ liệu từ máy chủ.');
      }
    );
  }

  /**
   * Create by: GiangLBH
   * Function: get list Price Ranges from backend (to search)
   * Date: 17/12/2022
   */
  getPriceRanges() {
    this._priceRangeService.getListPriceRange().subscribe(
      data => {
        this.priceRanges = data;
      }, error => {
        this._notificationService.showErrorNotification('Có lỗi khi tải dữ liệu từ máy chủ.');
      }
    );
  }

  /**
   * Create by: GiangLBH
   * Function: get list auction status from backend (to search)
   * Date: 17/12/2022
   */
  getAuctionStatus() {
    this._auctionStatusService.getListAuctionStatus().subscribe(
      data => {
        this.auctionStatus = data;
      }, error => {
        this._notificationService.showErrorNotification('Có lỗi khi tải dữ liệu từ máy chủ.');
      }
    );
  }

}
