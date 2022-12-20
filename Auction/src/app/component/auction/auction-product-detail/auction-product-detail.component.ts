import {Component, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {Product} from "../../../model/product/product";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Auction} from "../../../model/auction/auction";
import {PageAuctionByProductId} from "../../../model/auction/page-auction-by-product-id";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-auction-product-detail',
  templateUrl: './auction-product-detail.component.html',
  styleUrls: ['./auction-product-detail.component.css']
})
export class AuctionProductDetailComponent implements OnInit {
  changeBuyer: boolean = true;
  changeSeller: boolean = false;
  productDetail: Product;
  auctionPrice: number;
  rfAuction: FormGroup;
  newAuction: Auction;
  auctionPage : PageAuctionByProductId;
  idProductDetail;


  constructor(private _auctionService: AuctionService,
              private _formBuilder: FormBuilder,
              private _acRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idProductDetail = this._acRoute.snapshot.params.productId;
    this._auctionService.getAuctionByProductId(this.idProductDetail).subscribe(
      data => {
        this.productDetail = data;
        console.log('productDetail', this.productDetail);
        this.rfAuction = this._formBuilder.group({
          currentPrice: [this.productDetail.maxCurrentPrice],
          userId: [5],
          productId: [this.idProductDetail]
        }, {validators: [this.checkAuctionPrice]});
        this.selectedChangImage();
      }
    )
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
        userId: 5,
        productId: this.idProductDetail
      })
      // this.stateExistsSync('currentPrice');
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
        userId: [5],
        productId: [this.idProductDetail]
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
    console.log('gia dau', auctionPrice);
    if (auctionPrice < (Number(this.productDetail.maxCurrentPrice) + Number(this.productDetail.priceStep.step))) {
      console.log('aloooo');
      return {"checkAuctionPrice": true};
    }
    return null;
  }

  /**
   * Created: TienBM
   * Date: 19/12/2022
   */
  onAuction() {
    this._auctionService.addNewAuction(this.rfAuction.value).subscribe(
      data => {
        this.newAuction = data;
        document.getElementById('auto-reload').click();
        this.ngOnInit();
      }
    )

  }

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

  selectedChangImage() {
    setTimeout(() => {
      const imgF = document.querySelectorAll('.carousel__images');
      console.log(imgF);
      imgF.forEach(value => {
        value.children[0].classList.add('actived');
      });
    }, 500)
  }

}
