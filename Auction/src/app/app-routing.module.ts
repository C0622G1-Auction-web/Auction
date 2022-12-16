import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuideListComponent} from "./component/guide/guide-list/guide-list.component";
import {AuctionProductDetailComponent} from "./component/auction/auction-product-detail/auction-product-detail.component";
import {InfomationAuctionBuyerComponent} from "./component/auction/infomation-auction-buyer/infomation-auction-buyer.component";


const routes: Routes = [
  {
    path: "auction-detail/:productId", component: AuctionProductDetailComponent,
  },
];
import {ProductAddComponent} from "./component/product/product-add/product-add.component";
import {ProductEditComponent} from "./component/product/product-edit/product-edit.component";
import {TransactionComponent} from "./component/transaction/transaction.component";
import {HomeComponent} from "./component/home/home.component";
import {UserListComponent} from "./component/user/user-list/user-list.component";
import {UserEditComponent} from "./component/user/user-edit/user-edit.component";

const routes: Routes = [
  {
    path: "product/create",
    component: ProductAddComponent
  },
  {
    path: "product/edit",
    component: ProductEditComponent
  },

  {path:"aa", component: TransactionComponent},

  {
    path:"home",
    component: HomeComponent

  },
  {
    path: "user/list",
    component: UserListComponent
  },
  {
    path: "user/edit",
    component: UserEditComponent
  },
{
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
