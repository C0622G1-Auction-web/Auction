import {Injectable, OnInit} from '@angular/core';

import {Auction} from "../../model/auction/auction";
import {AuctionService} from "../auction/auction.service";
import {PageAuctionByProductId} from "../../model/auction/page-auction-by-product-id";
import {Stomp} from "@stomp/stompjs";
import * as  SockJS from 'sockjs-client';
import {Product} from "../../model/product/product";
import {Subject} from "rxjs";
import {ProductService} from "../product/product.service";
import {AuctionDto} from "../../model/auction/auction-dto";
import {User} from "../../model/user/user";
import {PageProduct} from "../../model/product/page-product";

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
  pageHome: Subject<PageProduct> = new Subject<PageProduct>();

  constructor(private _auctionService: AuctionService,
              private _productService: ProductService) {

    // this.productIdDetail = this._productService.getProductDetailId();
    // console.log('2 constructor');
    // console.log('product id Contructor', this.productIdDetail);
    // this.getAllAuction();

  }

  ngOnInit() {
  }

  connect() {
    const ws = new SockJS("http://localhost:8080/ws")
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      console.log('aaa');
      this.stompClient.subscribe('/topic/auction', data => {
        console.log('data', data);
        const auctionDto = JSON.parse(data.body);
        console.log('JSON-auction', auctionDto);
        this.auctionSubject.next(auctionDto);
        this.getAllAuction(this.productIdDetail);
        // this.getAllProduct(this._productService.getRfSearchHome());
        // console.log('search',this.getAllProduct(this._productService.getRfSearchHome()));
        if (this.auctionPageByProductId.content.filter(newAuction => newAuction.id === auctionDto.id)[0]) {
          //exists
          return;
        } else {
          this.auctionPageByProductId.content.unshift(auctionDto);
          this.auctionPageByProductId.content.pop();
        }
      })
    })
  }


  getAllAuction(productIdDetail?: number) {
    console.log('productIdDetail: ' + productIdDetail);
    this._auctionService.getAuctionPageByProductId(productIdDetail ?? this.productIdDetail, 0).subscribe(
      data => {
        this.listAuctionSubject.next(data);
        this.auctionPageByProductId = data;
        console.log('data', data)
      });
  }

  // getAllProduct(rfSearchHome:any) {
  //   this._productService.getAllAndSearch(rfSearchHome).subscribe(data => {
  //     console.log('home', data);
  //     this.pageHome.next(data);
  //   })
  // }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  createAuctionUsingWebsocket(auctionDto: AuctionDto) {
    let a: string = 'aaa';
    let auctionDTo: AuctionDto = {
      id: 100,
      currentPrice: 10000000,
      auctionTime: "2022-12-31",
      fullName: "Tien",
      userId: 5,
      productId: 7,
      maxCurrentPrice: 10000000
    };
    this.stompClient.send('/app/auctions', {}, JSON.stringify(auctionDto));
    console.log('auction-add', auctionDto);
  }

  setProductIdDetail(id: any) {
    this.productIdDetail = id;
  }

}
