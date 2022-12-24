import {Injectable, OnInit} from '@angular/core';

import {Auction} from "../../model/auction/auction";
import {AuctionService} from "../auction/auction.service";
import {PageAuctionByProductId} from "../../model/auction/page-auction-by-product-id";
import {Stomp} from "@stomp/stompjs";
import * as  SockJS from 'sockjs-client';
import {Product} from "../../model/product/product";
import {Subject} from "rxjs";
import {ProductService} from "../product/product.service";
import {PageProduct} from "../../model/product/page-product";
import {AuctionDto} from "../../dto/auction-dto";

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {

  stompClient: any;
  auctionPageByProductId: PageAuctionByProductId;
  auction: Auction;
  product: Product;
  auctionSubject: Subject<Auction> = new Subject<Auction>();
  productIdDetail: any;
  listAuctionSubject: Subject<PageAuctionByProductId> = new Subject<PageAuctionByProductId>()
  auctionDetailSubject: Subject<AuctionDto> = new Subject<AuctionDto>();
  auctionDetail: AuctionDto;
  currentHighestAuctionId: number;


  constructor(private _auctionService: AuctionService,
              private _productService: ProductService) {
  }

  ngOnInit() {
  }


  /**
   * Created: TienBM
   * Date: 18/12/2022
   * function: connect to topic to through stompClient
   */
  connect() {
    const ws = new SockJS("http://localhost:8080/ws")
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/auction', data => {
        const auctionDto = JSON.parse(data.body);
        this.auctionSubject.next(auctionDto);
        this.getAllAuction(this.productIdDetail);
      })
    })
  }

  /**
   * Created: TienBM
   * Date: 18/12/2022
   * function: get All page auction by product id
   * param: productIdDetail
   */
  getAllAuction(productIdDetail?: number) {
    this._auctionService.getAuctionPageByProductId(productIdDetail ?? this.productIdDetail, 0).subscribe(
      data => {
        this.listAuctionSubject.next(data);
        this.auctionPageByProductId = data;
        this.getAuctionDetail(this.productIdDetail);
      });
  }

  getAuctionDetail(productIdDetail?: number) {
    this._auctionService.getAuctionDetailByProductId(productIdDetail ?? this.productIdDetail).subscribe(
      data => {
        this.auctionDetailSubject.next(data);
        this.auctionDetail = data;
        this.currentHighestAuctionId = data.userId;
      }
    )
  }


  /**
   * Created: TienBM
   * Date: 18/12/2022
   * function: disconnect from stompClient
   */
  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  /**
   * Created: TienBM
   * Date: 18/12/2022
   * function: create auction using websocket  to through stompClient
   */
  createAuctionUsingWebsocket(auctionDto: AuctionDto) {
    this.stompClient.send('/app/auctions', {}, JSON.stringify(auctionDto));
  }

  /**
   * Created: TienBM
   * Date: 18/12/2022
   * function: change produt id detail
   */
  setProductIdDetail(id: any) {
    this.productIdDetail = id;
  }

}
