import {Component, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {Product} from "../../../model/product/product";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";


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

  constructor(private _auctionService: AuctionService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._auctionService.getAuctionByProductId(7).subscribe(
      data => {
        this.productDetail = data;
        console.log(this.productDetail);
        this.rfAuction = this._formBuilder.group({
          currentPrice: [this.productDetail.maxCurrentPrice]
        }, {validators: [this.checkAuctionPrice]})
      }
    )
  }


  onChangeAuction() {
    this.changeBuyer = !this.changeBuyer;
    this.changeSeller = !this.changeBuyer;
  }

  increaseAuctionPriceByPriceStep() {
    console.log(this.rfAuction.value.currentPrice);

    if (this.rfAuction.valid) {
      this.rfAuction.value.currentPrice = Number(this.rfAuction.value.currentPrice) + Number(this.productDetail.priceStep.step);
      this.auctionPrice = this.rfAuction.value.currentPrice;
      console.log("currentPriceCheck", this.rfAuction.value.currentPrice);
      console.log("auctionPrice", this.auctionPrice);
    } else {
      this.rfAuction.value.currentPrice = Number(this.productDetail.maxCurrentPrice) + Number(this.productDetail.priceStep.step);
      this.auctionPrice = this.rfAuction.value.currentPrice;
      this.checkAuctionPrice(this.rfAuction);
      console.log(this.rfAuction.value);
    }

  }

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
}
