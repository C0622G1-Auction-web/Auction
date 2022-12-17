import {Component, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {Product} from "../../../model/product/product";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Auction} from "../../../model/auction/auction";
import {Router} from "@angular/router";


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


  constructor(private _auctionService: AuctionService,
              private _formBuilder: FormBuilder,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._auctionService.getAuctionByProductId(2).subscribe(
      data => {
        this.productDetail = data;
        console.log(this.productDetail);
        this.rfAuction = this._formBuilder.group({
          currentPrice: [this.productDetail.maxCurrentPrice],
          userId: [5],
          productId: [2]
        }, {validators: [this.checkAuctionPrice]})
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
  }

  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function: Increase Auction Price By Price Step
   */
  increaseAuctionPriceByPriceStep() {
    console.log(this.rfAuction.value.currentPrice);
    if (this.rfAuction.valid) {
      this.rfAuction.value.currentPrice = Number(this.rfAuction.value.currentPrice) + Number(this.productDetail.priceStep.step);
      this.auctionPrice = this.rfAuction.value.currentPrice;
    } else {
      this.rfAuction.value.currentPrice = Number(this.productDetail.maxCurrentPrice) + Number(this.productDetail.priceStep.step);
      this.auctionPrice = this.rfAuction.value.currentPrice;
      this.rfAuction.setValue({
        currentPrice: this.auctionPrice,
        userId: 5,
        productId: 2
      })
      // this.stateExistsSync('currentPrice');
      this.checkAuctionPrice(this.rfAuction);
      console.log('curentPrice', this.rfAuction.value.currentPrice);
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
        productId: [1]
      })
      this.checkAuctionPrice(this.rfAuction);
      console.log('curentPrice', this.rfAuction.value.currentPrice);

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
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function: Submit
   */
  onSubmit() {

  }

  onAuction() {
    console.log((this.rfAuction.value));
    this._auctionService.addNewAuction(this.rfAuction.value).subscribe(
      data => {
        this.newAuction = data;
        console.log(this.newAuction)
        // Tự động reload
        // this._router.navigate(['/auction-detail',7]).then(() => {
        //   location.reload();
        // })
        document.getElementById('auto-reload').click();
        this.ngOnInit();
      }
    )
  }


}
