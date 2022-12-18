import {Component, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {PageAuctionByProductId} from "../../../model/auction/page-auction-by-product-id";

@Component({
  selector: 'app-infomation-auction-buyer',
  templateUrl: './infomation-auction-buyer.component.html',
  styleUrls: ['./infomation-auction-buyer.component.css']
})
export class InfomationAuctionBuyerComponent implements OnInit {
  auctionPageByProductId: PageAuctionByProductId
  productId: number;
  private user: any;


  constructor(private auctionService: AuctionService) {
  }

  ngOnInit(): void {
    this.auctionService.getAuctionPageByProductId(1, 0).subscribe(
      data => {
        this.auctionPageByProductId = data;
        console.log(this.auctionPageByProductId);
      }
    )
  }

  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function: next page
   * @param i : pageNumber
   */
  goToPage(i: number) {
    this.auctionService.getAuctionPageByProductId(1, i).subscribe(
      data => {
        this.auctionPageByProductId = data;
      }
    )
  }

}
