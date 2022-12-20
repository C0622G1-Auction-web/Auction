import {Injectable, OnInit} from '@angular/core';

import {Auction} from "../../model/auction/auction";
import {AuctionService} from "../auction/auction.service";
import {PageAuctionByProductId} from "../../model/auction/page-auction-by-product-id";
import {Stomp} from "@stomp/stompjs";
import * as  SockJS from 'sockjs-client';
import {Product} from "../../model/product/product";
import {Subject} from "rxjs";
import {ProductService} from "../product/product.service";

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
  constructor(private _auctionService: AuctionService,
              private _productService: ProductService) {

    this.productIdDetail = this._productService.getProductDetailId();
    console.log('2 constructor');
    console.log('product id Contructor', this.productIdDetail);
    this.getAllAuction();

  }

  ngOnInit() {
  }

  connect() {
    console.log('1 connect');
    console.log('connect, product id', this.productIdDetail);
    const ws = new SockJS("http://localhost:8080/ws")
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/auction', data => {
        const auction = JSON.parse(data.body);
        console.log(JSON.stringify(auction));
        this.auctionSubject.next(auction);

        if (this.auctionPageByProductId.content.filter(newAuction => newAuction.id === auction.id)[0]) {
          //exists
          return;
        } else {
          this.auctionPageByProductId.content.unshift(auction);
          this.auctionPageByProductId.content.pop();
        }
      })
    })
  }


  getAllAuction() {
      this._auctionService.getAuctionPageByProductId(this.productIdDetail, 0).subscribe(
        data => {
          this.auctionPageByProductId = data;
      });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  createAuctionUsingWebsocket(auction: Auction) {
    console.log('sang', auction);
    this.stompClient.send('/app/auctions', {}, JSON.stringify(auction));
  }

  setProductIdDetail(id: any) {
    this.productIdDetail = id;
  }

}
