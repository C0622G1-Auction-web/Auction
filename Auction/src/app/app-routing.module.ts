import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuctionProductDetailComponent} from "./component/auction/auction-product-detail/auction-product-detail.component";
import {InfomationAuctionBuyerComponent} from "./component/auction/infomation-auction-buyer/infomation-auction-buyer.component";


const routes: Routes = [
  {
    path: "auction-detail/:productId", component: AuctionProductDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
