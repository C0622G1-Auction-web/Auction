import { Component, OnInit } from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {PageAuctionProductHistory} from "../../../model/auction/page-auction-product-history";

@Component({
  selector: 'app-auction-product-history',
  templateUrl: './auction-product-history.component.html',
  styleUrls: ['./auction-product-history.component.css']
})
export class AuctionProductHistoryComponent implements OnInit {

  page = 1;
  pageSize = 5;
  pageAuctionProductHistory: PageAuctionProductHistory;
  giaSuId = 1;

  constructor( private  auctionService : AuctionService) { }

  ngOnInit(): void {
    this.findAll(2,0);
  }

  public findAll(id: number, pageNumber: number) {
      this.auctionService.findAll(id, pageNumber).subscribe(data => {
        this.pageAuctionProductHistory = data;
        console.log(this.pageAuctionProductHistory)
      })
    }

    gotoPage(pageNumber: number) {
      this.findAll(this.giaSuId,  pageNumber);
    }

}
