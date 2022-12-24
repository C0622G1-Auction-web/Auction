import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {Product} from "../../../model/product/product";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Auction} from "../../../model/auction/auction";
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "../../../service/socket/socket.service";
import {TokenService} from "../../../service/security/token.service";
import {Account} from "../../../model/account/account";
import {User} from "../../../model/user/user";
import {Title} from "@angular/platform-browser";
import {AuctionDto} from "../../../dto/auction-dto";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";
import {NotificationService} from "../../../service/notification/notification.service";


@Component({
  selector: 'app-auction-product-detail',
  templateUrl: './auction-product-detail.component.html',
  styleUrls: ['./auction-product-detail.component.css']
})


export class AuctionProductDetailComponent implements OnInit, OnDestroy {
  intervalList = [];
  styleForTime = "display: inline-block; text-align: center; min-width: 66px; font-size: 50px;font-weight: 500;color: #E74C3C;border-radius: 4px;background: #f5f5f5;padding: 4px;box-shadow: 1px 1px 2px rgba(213, 31, 31, 0.35);";
  styleForTimeDot = "display: block; font-size: 50px;font-weight: 500;color: #E74C3C; margin: 0 8px";
  changeBuyer: boolean = true;
  changeSeller: boolean = false;
  productDetail: Product;
  auctionPrice: number;
  rfAuction: FormGroup;
  newAuction: Auction;
  idProductDetail;
  checkLogin = false;
  accountRole: string;
  currentAccount: Account;
  auctionPageByProductId: any;
  formattedAmount;
  amount;
  userId: number = 0;
  currentUser: User;
  currentHighestAuction: AuctionDto;
  auctionable: number;
  editMask: any;


  constructor(private _auctionService: AuctionService,
              private _formBuilder: FormBuilder,
              private _acRoute: ActivatedRoute,
              private _socketService: SocketService,
              private _tokenService: TokenService,
              private _titleService: Title,
              private _notification: NotificationService) {
    this._titleService.setTitle("Đấu giá");
    this.idProductDetail = this._acRoute.snapshot.params.productId;
    this._socketService.setProductIdDetail(this.idProductDetail);
  }

  ngOnInit(): void {

    if (this._tokenService.isLogged()) {
      this.checkLogin = true;
      this.currentAccount = JSON.parse(this._tokenService.getAccount());
      const roles = this._tokenService.getRole();
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === "ROLE_ADMIN") {
          this.accountRole = "ROLE_ADMIN"
        }
      }

      this.currentUser = JSON.parse(this._tokenService.getUser());

      this.userId = this.currentUser.id;

    }


    this._auctionService.getAuctionByProductId(this.idProductDetail).subscribe(
      data => {
        this.productDetail = data;
        this.rfAuction = this._formBuilder.group({
          currentPrice: this.productDetail.maxCurrentPrice,
          userId: this.userId,
          productId: +this.idProductDetail
        }, {validators: [this.checkAuctionPrice]})
        this.selectedChangImage();

        this.runCountDowDate(new Date(this.productDetail.endTime).getTime());
      });


    this._socketService.auctionSubject.subscribe(data => {
      this.productDetail = {
        ...this.productDetail,
        maxCurrentPrice: data.currentPrice
      }

      this.rfAuction.get('currentPrice').setValue(data.currentPrice);

    });
    this.checkAuction();


  }

  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function: Transfer of seller and buyer information boards
   */
  onChangeInfoSeller() {
    this.changeBuyer = true;
    this.changeSeller = false;
    let titleSeller = document.getElementById("title-seller");
    let titleBuyer = document.getElementById("title-buyer");
    titleBuyer.style.backgroundColor = "#ffffff";
    titleSeller.style.backgroundColor = "transparent";
    titleSeller.style.color = 'white';
    titleBuyer.style.color = 'black';
  }

  /**
   * Created by: TienBM,
   * Date created: 17/12/2022
   * Function: Transfer of seller and buyer information boards
   */
  onChangeInfoAuction() {
    this.changeBuyer = false;
    this.changeSeller = true;
    let titleSeller = document.getElementById("title-seller");
    let titleBuyer = document.getElementById("title-buyer");
    titleBuyer.style.backgroundColor = "transparent";
    titleSeller.style.backgroundColor = "#ffffff";
    titleSeller.style.color = 'black';
    titleBuyer.style.color = 'white';


  }

  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function: Increase Auction Price By Price Step
   */
  increaseAuctionPriceByPriceStep() {
    if (this.rfAuction.valid) {
      this.rfAuction.value.currentPrice = Number(this.rfAuction.value.currentPrice) + Number(this.productDetail.priceStep.step);
      this.auctionPrice = this.rfAuction.value.currentPrice;
    } else {
      this.rfAuction.value.currentPrice = Number(this.productDetail.maxCurrentPrice) + Number(this.productDetail.priceStep.step);
      this.auctionPrice = this.rfAuction.value.currentPrice;
      this.rfAuction.setValue({
        currentPrice: this.auctionPrice,
        userId: this.userId,
        productId: this.idProductDetail
      })
      this.checkAuctionPrice(this.rfAuction);
    }

  }

  /**
   * Created by: TienBM,
   * Date created: 17/12/2022
   * Function: Reduce Auction Price By Price Step
   */
  reduceAuctionPriceByPriceStep() {
    if (this.rfAuction.valid) {
      this.rfAuction.value.currentPrice = Number(this.rfAuction.value.currentPrice) - Number(this.productDetail.priceStep.step);
      this.auctionPrice = this.rfAuction.value.currentPrice;
      this.rfAuction.setValue({
        currentPrice: this.auctionPrice,
        userId: this.userId,
        productId: +this.idProductDetail
      })
      this.checkAuctionPrice(this.rfAuction);
    }
  }


  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function: Check Auction Price
   * @param control
   * @return null if not error or true if error
   */
    // @ts-ignore
  checkAuctionPrice: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const auctionPrice = control.get("currentPrice").value;
    if (auctionPrice < (Number(this.productDetail.maxCurrentPrice) + Number(this.productDetail.priceStep.step))) {
      return {"checkAuctionPrice": true};
    }
    return null;
  }


  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function: Auction
   */
  onAuction() {
    this.checkAuction();
    this._socketService.createAuctionUsingWebsocket(this.rfAuction.value);
    document.getElementById('auto-reload').click();
    this.ngOnInit();
  }


  checkAuction() {
    this._socketService.auctionDetailSubject.subscribe(
      data => {
        this.currentHighestAuction = data;
        if (this.currentHighestAuction.userId === this.currentUser.id) {
          this.auctionable = 1;
        } else {
          this.auctionable = 0;
        }
      }
    );
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
      if (value.getAttribute('value') == j + '') {
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
    setTimeout(() => {
      const imgF = document.querySelectorAll('.carousel__images');
      imgF.forEach(value => {
        value.children[0].classList.add('actived');
      });
    }, 500)
  }

  runCountDowDate(countDownDate: any){
    console.log('lisst :', this.intervalList);
    let me = this;


    let selectorTime = '.time-';
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
              `<span style="${me.styleForTime}"
                  class="time__dd">
                  ${days} Ngày
              </span>` +
              `<span style="${me.styleForTimeDot}" class="mx-1">:</span>` +
              `<span style="${me.styleForTime}" class="time__hh red__color">
                             ${hours}
              </span>` +
              `<span style="${me.styleForTimeDot}" class="mx-1">:</span>` +
              `<span style="${me.styleForTime}" class="time__mm">${minutes}</span>` +
              `<span style="${me.styleForTimeDot}" class="mx-1">:</span>` +
              `<span style="${me.styleForTime}" class="time__ss">${seconds}</span>`;
          } else {
            clearInterval(countDow);
            e.innerHTML =
              `<span style=" font-size: 42px; font-weight: 500;   font-family: 'Roboto', sans-serif; text-transform: capitalize; color: #1c1d1d">Hết thời gian</span>`;
          }
        });
      });
      this.intervalList.push(countDow);
      console.log('list push', this.intervalList);
    } else {
      console.log('Gio co van de, yeu cau sua database');
    }
  }

  ngOnDestroy(): void {
    if(this.intervalList.length > 0) {
      for(let i = 0 ; i < this.intervalList.length; i ++) {
        clearInterval(this.intervalList[i]);
      }
    }
  }

}
