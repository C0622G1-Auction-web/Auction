import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product/product.service";
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
  giaSuId = 1;
  nameProduct:string;
  idCancel : number;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.findAll(1, 0);
  }

  /**
   * Created by: AnhTDQ,
   * Date created: 15/12/2022
   * Function: get list of status of product auctions
   * @return list Product , page
   */



  public findAll(id: number, pageNumber: number) {
    this.productService.findAll(id, pageNumber).subscribe(data => {
      this.pageHistory = data;
      console.log(this.pageHistory)
    })
  }

  gotoPage(pageNumber: number) {
    this.findAll(this.giaSuId,  pageNumber);
  }


  confirmCancel(value) {
    console.log(value)
this.nameProduct = value.name
    this.idCancel = value.id
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
        this.productService.cancelProduct(this.idCancel).subscribe(value1 => {
          console.log(this.idCancel);
          Swal.fire(
            'Đã đã hủy!',
            'Thông tin này đã được xóa.'
          );
          this.page = 1;
          this.ngOnInit();
        });
      }
    });
  }
}
