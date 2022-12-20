import {Component, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {PageAuctionByProductId} from "../../../model/auction/page-auction-by-product-id";
import {SocketService} from "../../../service/socket/socket.service";

@Component({
  selector: 'app-infomation-auction-buyer',
  templateUrl: './infomation-auction-buyer.component.html',
  styleUrls: ['./infomation-auction-buyer.component.css']
})
export class InfomationAuctionBuyerComponent implements OnInit {
  auctionPageByProductId: PageAuctionByProductId


  constructor(private _auctionService: AuctionService,
              private _socketService: SocketService) {
  }

  ngOnInit(): void {
    this._socketService.connect();
    this.auctionPageByProductId = this._socketService.auctionPageByProductId;
  }

  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function: next page
   * @param i : pageNumber
   */
  goToPage(i: number) {
    this._auctionService.getAuctionPageByProductId(1, i).subscribe(
      data => {
        this.auctionPageByProductId = data;
      }
    )
  }

}
