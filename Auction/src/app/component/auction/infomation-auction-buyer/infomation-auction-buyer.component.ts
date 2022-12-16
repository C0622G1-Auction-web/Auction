import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuctionService} from "../../../service/auction/auction.service";
import {PageAuctionByProductId} from "../../../model/auction/page-auction-by-product-id";

@Component({
  selector: 'app-infomation-auction-buyer',
  templateUrl: './infomation-auction-buyer.component.html',
  styleUrls: ['./infomation-auction-buyer.component.css']
})
export class InfomationAuctionBuyerComponent implements OnInit {
  auctionPageByProductId: PageAuctionByProductId

  constructor(private auctionService: AuctionService) {
  }

  ngOnInit(): void {
    this.auctionService.getAuctionPageByProductId(7, 0).subscribe(
      data => {
        this.auctionPageByProductId = data;
        console.log(this.auctionPageByProductId);
      }
    )
  }

  goToPage(i: number) {
    this.auctionService.getAuctionPageByProductId(2, i).subscribe(
      data => {
        this.auctionPageByProductId = data;
      }
    )
  }
}
