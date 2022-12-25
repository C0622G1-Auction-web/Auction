import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product/product.service";
import {PageProduct} from "../../model/product/page-product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Category} from "../../model/product/category";
import {CategoryService} from "../../service/product/category.service";
import {UserService} from "../../service/user/user.service";
import {SocketService} from "../../service/socket/socket.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {interval} from "rxjs";

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
  natedProduct: any;
  intervalList = [];

  constructor(private _productService: ProductService,
              private _formBuilder: FormBuilder,
              private _categoryService: CategoryService,
              private _userService: UserService,
              private _socketService: SocketService,
              private _titleService: Title,
              private _route: Router) { }

  ngOnInit(): void {
    this._titleService.setTitle('Trang Chủ');
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
    this.getTop();
  }

  /**
   * Created: SangDD
   * Function: Get product and seach...
   * Date: 15/11/2022
   */
  gotoPage(rfSearch: any) {
    this._productService.getAllAndSearch(this.rfSearch.value).subscribe(data => {
      this.pageProducts = data;
      if(!this.natedProduct) {
        this.natedProduct = data.content.slice(0, 4);
      }
      this.runCountDowTime(data);
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
      this.runCountDowTime(this.pageProducts);
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

  /**
   * Created: SangDD
   * date: 18/12/2022
   * @param categoryId
   * @param rangePrice
   * @param productAuctionStatus
   * @param name is product name
   */

  setValueAuctionProductStatusSearch(categoryId: any,
                                     rangePrice: any,
                                     productAuctionStatus: string,
                                     name: string ) {
    this.clearInterValList();
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
   * @param i, image main
   * @param j, image sub
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

  /**
   * Created: SangDD
   * Date: 18/12/2022
   * function: highlight image selected
   */
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
    // this._userService.findTopUser().subscribe(data => {
    //   this.topUser = data;
    //   console.log(data);
    // })
  }

  setValueProductId(id: any) {
    this._productService.setProductDetailId(id);
    this._route.navigate(['auction-detail', id]);
  }

  runCountDowTime(products){
      let endTime: any;
      for(let i = 0; i < products.totalElements; i++) {
        endTime = products.content[i]?.endTime;
        console.log('end time: ', i , endTime);
        console.log('endteime get time', i, new Date(endTime).getTime() - new Date().getTime());
        this.runCountDowDate(new Date(endTime).getTime(), i);
      }
  }

  runCountDowDate(countDownDate: any, i: any){
    let selectorTime = '.time-' + i;
    if(countDownDate) {
        let countDow = setInterval(function() {

          // Get today's date and time
          let now = new Date().getTime();

          // Find the distance between now and the count down date
          let distance = countDownDate - now;

          // Time calculations for days, hours, minutes and seconds
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
          document.querySelectorAll(selectorTime).forEach(e => {
            if (distance > 0) {
              e.innerHTML =
                `<span style="
                    min-width:30px;
                    text-align: center;
                    border: 1px solid red;
                    padding: 2px;
                    border-radius: 3px;"
                    class="time__dd">
                    ${days} Ngày
                </span>` +
                `<span class="mx-1">:</span>` +
                `<span style="min-width:30px; text-align: center; border: 1px solid red; padding: 2px; border-radius: 3px" class="time__hh red__color">${hours}</span>` +
                `<span class="mx-1">:</span>` +
                `<span style="min-width:30px; text-align: center; border: 1px solid red; padding: 2px; border-radius: 3px" class="time__mm">${minutes}</span>` +
                `<span class="mx-1">:</span>` +
                `<span style="min-width:30px; text-align: center; border: 1px solid red; padding: 2px; border-radius: 3px" class="time__ss">${seconds}</span>`;
            } else {
              clearInterval(countDow);
              e.innerHTML =
              `<span class="time__hh mx-2" style="color: #95abb9">Hết thời gian</span>`;
            }
          });
        });
        this.intervalList.push(countDow);
      } else {
        console.log('Gio co van de, yeu cau sua database');
      }
  }

  clearInterValList() {
    if(this.intervalList.length > 0) {
      this.intervalList.forEach(value => {
        console.log('xoa gio');
        clearInterval(value);
      })
      this.intervalList = [];
    }
  }
}

