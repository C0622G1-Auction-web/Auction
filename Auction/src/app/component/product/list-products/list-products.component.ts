import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product/product.service';
import {Product} from '../../../model/product/product';
import {NotificationService} from '../../../service/notification/notification.service';
import {PageProduct} from '../../../model/product/page-product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  p = 1;
  count = 5;

  pageProducts: PageProduct;

  constructor(private _productService: ProductService,
              private _notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._productService.getAll().subscribe(data => {
      this.pageProducts = data;
      console.log(this.pageProducts);
    }, error => {
      this._notificationService.showErrorNotification('Không thể kết nối đến Server');
    });
  }

}
