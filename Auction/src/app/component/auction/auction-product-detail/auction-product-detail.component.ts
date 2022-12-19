import {Component, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";

@Component({
  selector: 'app-auction-product-detail',
  templateUrl: './auction-product-detail.component.html',
  styleUrls: ['./auction-product-detail.component.css']
})
export class AuctionProductDetailComponent implements OnInit {
  changeBuyer: boolean = true;
  changeSeller: boolean = false;
  productDetail

  constructor(private _auctionService: AuctionService) {
  }

  ngOnInit(): void {
    this._auctionService.getAuctionByProductId(7).subscribe(
      data => {
        this.productDetail = data;
        console.log(this.productDetail);
      }
    )
  }


  onChangeAuction() {
    this.changeBuyer = !this.changeBuyer;
    this.changeSeller = !this.changeBuyer;
  }

}
