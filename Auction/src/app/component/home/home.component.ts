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
    this.runcountDowDate();

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
   * function: highlight img được chọn
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
    console.log('bat dau truyen ', id);
  }

  runcountDowDate(){
    var countDownDate = new Date("2022-12-24 23:59:59").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      document.querySelectorAll(".time").forEach(e => {
        e.innerHTML = `<span class="time__hh mx-2">${hours} : </span>` +
          `<span class="time__mm mx-2">${minutes} :</span>` +
          `<span class="time__ss mx-2">${seconds}</span>`;
      });

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = `<span class="time__hh mx-2">0 : </span>` +
          `<span class="time__mm mx-2">0 :</span>` +
          `<span class="time__ss mx-2">0</span>`;
      }
    }, 1000);
  }
}

