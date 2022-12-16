import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductAddComponent} from './component/product/product-add/product-add.component';
import {GuideListComponent} from "./component/guide/guide-list/guide-list.component";
import {AuctionProductDetailComponent} from "./component/auction/auction-product-detail/auction-product-detail.component";

const routes: Routes = [{
  path: 'product/add',
  component: ProductAddComponent
}, {
  path: 'guide',
  component: GuideListComponent
},
  {
    path: "auction/:productId", component: AuctionProductDetailComponent,

  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
