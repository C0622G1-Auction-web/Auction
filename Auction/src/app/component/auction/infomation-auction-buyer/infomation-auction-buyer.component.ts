import {Component, OnInit} from '@angular/core';
import {AuctionService} from "../../../service/auction/auction.service";
import {PageAuctionByProductId} from "../../../model/auction/page-auction-by-product-id";
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "../../../service/socket/socket.service";

@Component({
  selector: 'app-infomation-auction-buyer',
  templateUrl: './infomation-auction-buyer.component.html',
  styleUrls: ['./infomation-auction-buyer.component.css']
})
export class InfomationAuctionBuyerComponent implements OnInit {
  auctionPageByProductId: PageAuctionByProductId
  idProductDetail;


  constructor(private _auctionService: AuctionService,
              private _acRoute: ActivatedRoute,
              private _socketService: SocketService) {
  }

  ngOnInit(): void {
    this.idProductDetail = this._acRoute.snapshot.params.productId;
    this._auctionService.getAuctionPageByProductId(this.idProductDetail, 0).subscribe(
      data => {
        this.auctionPageByProductId = data;
      }, error => {
        console.log('Chưa có đấu giá nào...')
      }
    );
    this._socketService.connect();
    this._socketService.setProductIdDetail(this.idProductDetail);
    this.auctionPageByProductId = this._socketService.auctionPageByProductId;
  }

  /**
   * Created by: TienBM,
   * Date created: 16/12/2022
   * Function: next page
   * @param i : pageNumber
   */
  goToPage(i: number) {
    this._auctionService.getAuctionPageByProductId(this.idProductDetail, i).subscribe(
      data => {
        this.auctionPageByProductId = data;
      }
    )
  }

}
