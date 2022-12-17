import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuideListComponent} from "./component/guide/guide-list/guide-list.component";
import {AuctionProductDetailComponent} from "./component/auction/auction-product-detail/auction-product-detail.component";
import { AuctionProductAddComponent } from './component/auction/auction-product-add/auction-product-add.component';

const routes: Routes = [
  {
  path: 'guide',
  component: GuideListComponent
},
  {
    path: "auction/:productId", component: AuctionProductDetailComponent,

  }, {
    path: "auction/product/add", component: AuctionProductAddComponent,

  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
