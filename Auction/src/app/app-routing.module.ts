import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductAddComponent} from './component/product/product-add/product-add.component';
import {GuideListComponent} from "./component/guide/guide-list/guide-list.component";
import {AuctionProductDetailComponent} from "./component/auction/auction-product-detail/auction-product-detail.component";
import {GuideAddComponent} from "./component/guide/guide-add/guide-add.component";
import {GuideEditComponent} from "./component/guide/guide-edit/guide-edit.component";


const routes: Routes = [{
  path: 'product/add',
  component: ProductAddComponent
},
  {
  path: 'guide',
  component: GuideListComponent
},
  {
    path: 'guide/edit/:id',
    component: GuideEditComponent
  },
  {
    path:'guide/add',
    component:GuideAddComponent
  },
  {
    path: "auction/:productId", component: AuctionProductDetailComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
