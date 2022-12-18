import {Component, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {Auction} from "../../../model/auction/auction";
import {Product} from "../../../model/product/product";
import {User} from "../../../model/user/user";

@Component({
  selector: 'app-infomation-auction-seller',
  templateUrl: './infomation-auction-seller.component.html',
  styleUrls: ['./infomation-auction-seller.component.css']
})
export class InfomationAuctionSellerComponent implements OnInit {
  productAuction: Product;


  constructor(private _auctionService: AuctionService) {
  }

  ngOnInit(): void {
    this._auctionService.getAuctionByProductId(2).subscribe(
      data => {
        this.productAuction = data;
        console.log("product",this.productAuction);
      }
    )
  }

}
