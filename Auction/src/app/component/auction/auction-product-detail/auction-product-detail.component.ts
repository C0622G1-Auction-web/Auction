import {Component, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-auction-product-detail',
  templateUrl: './auction-product-detail.component.html',
  styleUrls: ['./auction-product-detail.component.css']
})
export class AuctionProductDetailComponent implements OnInit {
  changeBuyer: boolean = true;
  changeSeller: boolean = false;
  productDetail;
  idProductDetail;

  constructor(private _auctionService: AuctionService, private _acRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idProductDetail = this._acRoute.snapshot.params.productId;

    this._auctionService.getAuctionByProductId(this.idProductDetail).subscribe(
      data => {
        this.productDetail = data;
        console.log('aaaa', this.productDetail);
      }
    )
  }


  onChangeAuction() {
    this.changeBuyer = !this.changeBuyer;
    this.changeSeller = !this.changeBuyer;
  }

}
