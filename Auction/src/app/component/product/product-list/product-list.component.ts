import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product/product.service";
import {User} from "../../../model/user/user";
import {TokenService} from "../../../service/security/token.service";
import {PageProductHistory} from "../../../model/product/dto/page-product-history";

import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  page = 1;
  pageSize = 5;
  p: number = 1;

  pageHistory: PageProductHistory;
  userId: number;
  currentUser: User;

  nameProduct: string;
  idCancel: number;

  constructor(
    private tokenService: TokenService,
    private productService: ProductService,) {
  }

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.currentUser = JSON.parse(this.tokenService.getUser());
      this.userId = this.currentUser.id;

    }

    this.findAll(this.userId, 0);

  }

  /**
   * Created by: AnhTDQ,
   * Date created: 15/12/2022
   * Function: get list of status of product auctions
   * @return list Product , page
   */

  public findAll(id: number, pageNumber: number) {
    this.productService.findAllProduct(id, pageNumber).subscribe(data => {
      this.pageHistory = data;
    })

  }

  gotoPage(pageNumber: number) {
    this.findAll(this.userId, pageNumber);
  }

  confirmCancel(id: number) {
    Swal.fire({
      title: 'Bạn có muốn hủy sản phẩm này không ?',
      text: 'Tác vụ này không thể hoàn tác !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng Ý',
      cancelButtonText: 'Hủy Bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.cancelProduct(id).subscribe(value1 => {
          Swal.fire(
            'Đã đã hủy!',
            'Thông tin này đã được xóa.'
          );
          this.ngOnInit();
        });
      }
    });
  }

}
