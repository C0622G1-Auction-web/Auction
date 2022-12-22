import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user/user";
import {AuctionService} from "../../../service/auction/auction.service";
import {TokenService} from "../../../service/security/token.service";
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
  userId: number;
  currentUser: User;

  constructor(
    private  auctionService : AuctionService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.isLogged()) {
      this.currentUser = JSON.parse(this.tokenService.getUser());
      this.userId = this.currentUser.id;
    }
    this.findAll(this.userId,0);
  }

  private findAll(id: number, pageNumber: number) {
    this.auctionService.findAll(id, pageNumber).subscribe(data => {
      this.pageAuctionProductHistory = data;
      console.log(this.pageAuctionProductHistory)
    })
  }

  gotoPage(pageNumber: number) {
    this.findAll(this.userId,  pageNumber);
  }

}
