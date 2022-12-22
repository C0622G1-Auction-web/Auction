import {Component, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {Product} from "../../../model/product/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-infomation-auction-seller',
  templateUrl: './infomation-auction-seller.component.html',
  styleUrls: ['./infomation-auction-seller.component.css']
})
export class InfomationAuctionSellerComponent implements OnInit {
  productAuction: Product;
  idProductDetail;


  constructor(private _auctionService: AuctionService,
              private _acRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idProductDetail = this._acRoute.snapshot.params.productId;
    this._auctionService.getAuctionByProductId(1).subscribe(
      data => {
        this.productAuction = data;
        // console.log("product",this.productAuction);
      }
    )
  }

}
